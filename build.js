/**
 * build.js — Pre-compilation step
 * Reads JSON data from question_data/ and generates src/story/generated_data.twee
 * so that Tweego can embed the data into the compiled HTML.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'question_data');
const OUT_FILE = path.join(__dirname, 'src', 'story', 'generated_data.twee');

// Instagram-like profile data keyed by comment ID
// (UI-layer enrichment — kept separate from the raw question JSON)
const IG_PROFILES = {
  M1_01: { user: 'foodie_sg2024',   displayName: 'Foodie Sài Gòn',   avatar_color: '#e74c3c', timeAgo: '2 giờ',   likes: 847 },
  M1_02: { user: 'pc_master_vn',    displayName: 'PC Master VN',      avatar_color: '#3498db', timeAgo: '45 phút',  likes: 1203 },
  M1_03: { user: 'darknet_user99',  displayName: 'Shadow_X',          avatar_color: '#2c3e50', timeAgo: '12 phút',  likes: 3 },
  M1_04: { user: 'keeb_lover',      displayName: 'Keeb Enthusiast',   avatar_color: '#9b59b6', timeAgo: '5 giờ',    likes: 562 },
  M1_05: { user: 'esports_vn',      displayName: 'Team eSports VN',   avatar_color: '#e67e22', timeAgo: '1 giờ',    likes: 2341 },
  M1_06: { user: 'vy_chloe',        displayName: 'Thảo Vy (Chloê)',   avatar_color: '#1abc9c', timeAgo: '3 giờ',    likes: 104 },
  M1_07: { user: 'lan_anh_dang',    displayName: 'Lan Anh Đặng',       avatar_color: '#fd79a8', timeAgo: '20 phút',   likes: 42 },
  M1_08: { user: 'nhat_nam_99',      displayName: 'Nhật Nam Nguyễn',    avatar_color: '#0984e3', timeAgo: '1 giờ',    likes: 312 },
  M1_09: { user: 'tech_reviewer',    displayName: 'Minh Hoàng Tech',    avatar_color: '#6c5ce7', timeAgo: '4 giờ',    likes: 721 },
  M1_10: { user: 'minh_triet_hoc',   displayName: 'Minh Triết Học',     avatar_color: '#ffeaa7', timeAgo: '10 phút',   likes: 18 },
  M1_11: { user: 'hack_service_xyz', displayName: 'Hacker Uy Tín 24/7', avatar_color: '#2d3436', timeAgo: '5 phút',    likes: 0 },
  M1_12: { user: 'tu_ve_shop_vn',   displayName: 'Shop Tự Vệ Giá Rẻ', avatar_color: '#ffeaa7', timeAgo: '1 giờ',    likes: 1 },
  M1_13: { user: 'giang_ho_online', displayName: 'Dịch Vụ Đòi Nợ',    avatar_color: '#d63031', timeAgo: '30 phút',  likes: 0 },
  M1_14: { user: 'hieu_diy',        displayName: 'Minh Hiếu DIY',     avatar_color: '#00cec9', timeAgo: '2 giờ',    likes: 412 },
  M1_15: { user: 'tra_chanh_viahe',  displayName: 'Hội Trà Chanh',     avatar_color: '#74b9ff', timeAgo: '1 giờ',    likes: 852 },
  M1_16: { user: 'it_helpdesk',     displayName: 'Tùng Lâm Tech',     avatar_color: '#e84393', timeAgo: '5 phút',   likes: 67 },
  M1_17: { user: 'vietnam_tshirt',  displayName: 'Thời Trang Local',  avatar_color: '#e17055', timeAgo: '3 giờ',    likes: 1250 },
  M1_18: { user: 'sua_chua_laptop', displayName: 'Sửa Laptop Tận Tâm', avatar_color: '#6c5ce7', timeAgo: '4 giờ',    likes: 89 },
  M1_19: { user: 'nam_vung_news',   displayName: 'Nằm Vùng Ký Sự',    avatar_color: '#20bf6b', timeAgo: '1 ngày',   likes: 1953 },
  M1_20: { user: 'ca_khia_member',  displayName: 'Khánh Linh Ng',     avatar_color: '#eb3b5a', timeAgo: '12 phút',  likes: 219 },
  M1_21: { user: 'tinh_don_phuong', displayName: 'Mối Tình Vắt Vai',   avatar_color: '#a55eed', timeAgo: '2 giờ',    likes: 45 },
  M1_22: { user: 'khoac_lac_friend',displayName: 'Hải Đăng Đặng',     avatar_color: '#fa8231', timeAgo: '30 phút',  likes: 8 },
  M1_23: { user: 'phoi_bay_su_that', displayName: 'Bóc Phốt Store',    avatar_color: '#3867d6', timeAgo: '1 giờ',    likes: 489 },
  M1_24: { user: 'song_ao_girl',    displayName: 'Quỳnh Trang Vy',    avatar_color: '#fd9644', timeAgo: '10 phút',  likes: 567 },
  M1_25: { user: 'giay_to_gia_re',  displayName: 'CCCD Uy Tín',       avatar_color: '#34495e', timeAgo: '2 giờ',    likes: 0 },
  M1_26: { user: 'lam_bang_lai_xe', displayName: 'Bằng Lái Toàn Quốc',avatar_color: '#7f8c8d', timeAgo: '1 giờ',    likes: 0 },
  M1_27: { user: 'ship_hang_bien',  displayName: 'Vận Chuyển Cửa Khẩu',avatar_color: '#16a085', timeAgo: '4 giờ',    likes: 2 },
  M1_28: { user: 'ads_gambling_vn', displayName: 'Spam Ads Game',     avatar_color: '#27ae60', timeAgo: '30 phút',  likes: 0 },
  M1_29: { user: 'thuoc_giam_can',  displayName: 'Slim Beauty',       avatar_color: '#2980b9', timeAgo: '1 ngày',   likes: 1 },
  M1_30: { user: 'chay_diem_thi',   displayName: 'Học Bạ Chuẩn',      avatar_color: '#8e44ad', timeAgo: '5 giờ',    likes: 0 },
  M1_31: { user: 'cam_spy_pro',     displayName: 'Camera Thầm Lặng',  avatar_color: '#2c3e50', timeAgo: '10 phút',  likes: 0 },
  M1_32: { user: 'dien_nuoc_tips',  displayName: 'Mẹo Điện Nước',     avatar_color: '#f39c12', timeAgo: '12 giờ',   likes: 154 },
  M1_33: { user: 'data_khach_hang', displayName: 'Kho Dữ Liệu Việt',  avatar_color: '#d35400', timeAgo: '3 giờ',    likes: 0 },
  M1_34: { user: 'thiet_bi_thi_cu', displayName: 'Thi Cử Công Nghệ',  avatar_color: '#c0392b', timeAgo: '1 giờ',    likes: 0 },
  M1_35: { user: 'dealer_hn_weed',  displayName: 'Ke Bay Lak HN',      avatar_color: '#130f40', timeAgo: '5 phút',    likes: 0 },
  M1_36: { user: 'passport_fake',   displayName: 'Hộ Chiếu Hải Quan', avatar_color: '#5758bb', timeAgo: '2 giờ',    likes: 0 },
  M1_37: { user: 'thuoc_me_shop',   displayName: 'Hóa Chất Y Tế',     avatar_color: '#1289a7', timeAgo: '45 phút',  likes: 0 },
  M1_38: { user: 'doi_no_nhanh',    displayName: 'Thu Hồi Tài Sản',   avatar_color: '#b71540', timeAgo: '1 giờ',    likes: 0 },
  M1_39: { user: 'hack_game_mob',   displayName: 'Mod Game VN',       avatar_color: '#009432', timeAgo: '3 giờ',    likes: 15 },
  M1_40: { user: 'phao_hoa_tet_99', displayName: 'Pháo Hoa Tết',      avatar_color: '#e84118', timeAgo: '15 phút',  likes: 4 },
};

// Fallback profile for any new questions added to the JSON
const DEFAULT_PROFILE = { user: 'user', displayName: 'Người dùng', avatar_color: '#7f8c8d', timeAgo: '1 giờ', likes: 0 };

try {
  // --- Read Act 1 data ---
  const act1Raw = fs.readFileSync(path.join(DATA_DIR, 'act1.json'), 'utf-8');
  const act1Data = JSON.parse(act1Raw);

  // Merge IG profile data into each Act 1 comment
  const act1Enriched = act1Data.map(item => {
    const profile = IG_PROFILES[item.id] || DEFAULT_PROFILE;
    return { ...profile, ...item };
  });

  // --- Read Act 3 data ---
  const act3Raw = fs.readFileSync(path.join(DATA_DIR, 'act3.json'), 'utf-8');
  const act3Data = JSON.parse(act3Raw);

  // Normalize: rename context_options → options for SugarCube code compatibility
  const act3Normalized = act3Data.map(item => {
    const obj = { ...item };
    if (obj.context_options && !obj.options) {
      obj.options = obj.context_options;
      delete obj.context_options;
    }
    // Normalize comment_text → text for Act 3 (act3.twee uses .text)
    if (obj.comment_text && !obj.text) {
      obj.text = obj.comment_text;
      delete obj.comment_text;
    }
    return obj;
  });

  // --- Generate Twee output ---
  const tweeContent = `:: GeneratedData [script]
/* ============================================================
   AUTO-GENERATED — DO NOT EDIT MANUALLY
   Source: question_data/act1.json, question_data/act3.json
   Generated: ${new Date().toISOString()}
   ============================================================ */

setup.act1Comments = ${JSON.stringify(act1Enriched, null, 2)};

setup.act3Comments = ${JSON.stringify(act3Normalized, null, 2)};
`;

  fs.writeFileSync(OUT_FILE, tweeContent, 'utf-8');
  console.log(`[build.js] Generated ${OUT_FILE}`);
  console.log(`  Act 1: ${act1Enriched.length} comments`);
  console.log(`  Act 3: ${act3Normalized.length} comments`);

} catch (err) {
  console.error('[build.js] ERROR:', err.message);
  process.exit(1);
}

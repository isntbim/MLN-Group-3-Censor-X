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

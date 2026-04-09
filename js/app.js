// ===== SHARED DATA STORE (localStorage-backed) =====
const HHI = {

  // --- NEWS ---
  getNews() {
    const raw = localStorage.getItem('hhi_news');
    if (raw) return JSON.parse(raw);
    const seed = [
      { id:1, title:"New Simulation Labs Inaugurated", body:"The institution has opened state-of-the-art simulation laboratories for nursing and emergency students, equipped with high-fidelity mannequins and modern medical devices.", category:"Facilities", date:"2025-03-15", author:"Admin", image:null },
      { id:2, title:"Graduation Ceremony for Class of 2025", body:"Over 120 students graduated across Nursing, Emergency, and Midwifery departments. The ceremony was attended by the Wasit Health Directorate.", category:"Events", date:"2025-06-10", author:"Admin", image:null },
      { id:3, title:"Thesis Submission Deadline – Fall 2025", body:"Final-year students are reminded that thesis submissions for the Fall 2025 semester are due by November 30. Please coordinate with your supervisors.", category:"Academic", date:"2025-10-01", author:"Academic Affairs", image:null },
      { id:4, title:"Partnership with Wasit General Hospital", body:"A new memorandum of understanding has been signed between HHI Wasit and Wasit General Hospital to enhance clinical training and internship opportunities.", category:"Partnerships", date:"2025-09-05", author:"Admin", image:null },
      { id:5, title:"Emergency Medicine Workshop", body:"A two-day intensive workshop on advanced life support and trauma care was conducted by specialists from Baghdad Medical City.", category:"Training", date:"2025-11-20", author:"Emergency Dept.", image:null },
      { id:6, title:"Midwifery Department Accreditation Renewed", body:"The Midwifery department has successfully renewed its national accreditation after an on-site evaluation by the Iraqi Ministry of Higher Education.", category:"Academic", date:"2025-12-01", author:"Admin", image:null }
    ];
    localStorage.setItem('hhi_news', JSON.stringify(seed));
    return seed;
  },
  saveNews(arr) { localStorage.setItem('hhi_news', JSON.stringify(arr)); },

  // --- THESES ---
  // File data stored separately under key hhi_thesis_file_<id> to avoid
  // hitting the per-key size limit when many theses are stored.
  getTheses() {
    const raw = localStorage.getItem('hhi_theses');
    if (raw) return JSON.parse(raw);
    const seed = [
      { id:1, title:"The Effect of Patient Education on Post-Surgical Compliance in Wasit Province", author:"Fatima Al-Rashidi", department:"nursing", year:2024, supervisor:"Dr. Ahmed Al-Saadi", abstract:"This study examines how structured patient education programs affect compliance with post-surgical care instructions among patients in Wasit Province hospitals.", filename:"al-rashidi-2024.pdf", filesize:"1.2 MB", uploaded:"2024-08-15", hasFile:false },
      { id:2, title:"Assessment of Triage Accuracy in Emergency Departments: A Cross-Sectional Study", author:"Hassan Mohammed Al-Khalidi", department:"emergency", year:2024, supervisor:"Dr. Noor Ibrahim", abstract:"A cross-sectional analysis of triage decision accuracy across three emergency departments in Wasit, evaluating adherence to the Manchester Triage System.", filename:"al-khalidi-2024.pdf", filesize:"980 KB", uploaded:"2024-09-02", hasFile:false },
      { id:3, title:"Maternal Outcomes of Home vs. Institutional Delivery in Rural Wasit", author:"Zainab Karim Majeed", department:"midwifery", year:2023, supervisor:"Dr. Layla Hassan", abstract:"Comparative study of maternal and neonatal outcomes between home deliveries and institutional deliveries in rural areas of Wasit Governorate.", filename:"majeed-2023.pdf", filesize:"1.5 MB", uploaded:"2023-12-10", hasFile:false },
      { id:4, title:"Burnout Prevalence Among ICU Nurses in Wasit Hospitals", author:"Sara Qasim Al-Tamimi", department:"nursing", year:2023, supervisor:"Dr. Ahmed Al-Saadi", abstract:"Measurement of burnout syndrome using the Maslach Burnout Inventory among ICU nurses, identifying key contributing factors in the local healthcare context.", filename:"al-tamimi-2023.pdf", filesize:"870 KB", uploaded:"2023-11-28", hasFile:false },
      { id:5, title:"Knowledge and Attitudes of Nursing Students Toward Patient Safety Culture", author:"Ali Jabbar Al-Zubaidi", department:"nursing", year:2025, supervisor:"Dr. Maryam Saleh", abstract:"Survey-based study assessing the level of patient safety knowledge and attitudes among undergraduate nursing students at HHI Wasit.", filename:"al-zubaidi-2025.pdf", filesize:"1.1 MB", uploaded:"2025-02-14", hasFile:false },
      { id:6, title:"Factors Influencing Antenatal Care Attendance in Wasit Governorate", author:"Nadia Hussain Al-Samir", department:"midwifery", year:2025, supervisor:"Dr. Layla Hassan", abstract:"Qualitative and quantitative investigation of barriers and facilitators to antenatal care attendance among pregnant women in urban and peri-urban Wasit.", filename:"al-samir-2025.pdf", filesize:"1.3 MB", uploaded:"2025-03-20", hasFile:false }
    ];
    localStorage.setItem('hhi_theses', JSON.stringify(seed));
    return seed;
  },
  saveTheses(arr) { localStorage.setItem('hhi_theses', JSON.stringify(arr)); },

  // Store actual PDF data separately (base64 data URL)
  saveThesisFile(id, dataUrl) {
    try {
      localStorage.setItem('hhi_thesis_file_' + id, dataUrl);
      return true;
    } catch(e) {
      // localStorage quota exceeded
      console.warn('Storage quota exceeded for thesis file', id);
      return false;
    }
  },
  getThesisFile(id) {
    return localStorage.getItem('hhi_thesis_file_' + id);
  },
  deleteThesisFile(id) {
    localStorage.removeItem('hhi_thesis_file_' + id);
  },

  // --- AUTH ---
  ADMIN_USER: 'admin',
  ADMIN_PASS: 'hhi2025',
  isLoggedIn() { return sessionStorage.getItem('hhi_admin') === 'true'; },
  login(u, p) {
    if (u === HHI.ADMIN_USER && p === HHI.ADMIN_PASS) {
      sessionStorage.setItem('hhi_admin', 'true'); return true;
    }
    return false;
  },
  logout() { sessionStorage.removeItem('hhi_admin'); }
};

// ===== UTILITY =====
function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function nextId(arr) { return arr.length ? Math.max(...arr.map(x=>x.id)) + 1 : 1; }

// Read a File object as a base64 data URL
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Trigger a real browser download from a data URL
function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href     = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

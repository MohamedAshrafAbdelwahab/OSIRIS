/* =========================================================
   i18n — الترجمات (English / العربية)
   ========================================================= */

const I18N = {
  en: {
    gameTitle: 'ABANDONED\nBUT NOT\nFORGOTTEN',
    teamCredit: 'By Team NileStro',
    pageTitle: 'Abandoned But Not Forgotten — Project OSIRIS',

    newGame:  'NEW GAME',
    continue: 'CONTINUE',
    settings: 'SETTINGS',

    settingsTitle: 'SETTINGS',
    volume:   'VOLUME',
    language: 'LANGUAGE',
    close:    'CLOSE',

    fullscreen:      'FULLSCREEN',
    exitFullscreen:  'EXIT FULLSCREEN',

    files:    'FILES',
    pdfStory: 'CHILDREN STORY (PDF)',
    pdfGuide: 'TEACHER GUIDE (PDF)',

    preloading:  'LOADING GAME ASSETS…',
    preloadDone: 'LOADING COMPLETE — READY TO PLAY',
    langSwitchLabel: 'العربية',   // ما يظهر على الزر = اللغة الأخرى
  },

  ar: {
    gameTitle: 'مهجور\nلكن\nغير منسي',
    teamCredit: 'بواسطة فريق NileStro',
    pageTitle: 'مهجور لكن غير منسي — Project OSIRIS',

    newGame:  'لعبة جديدة',
    continue: 'متابعة',
    settings: 'الإعدادات',

    settingsTitle: 'الإعدادات',
    volume:   'مستوى الصوت',
    language: 'اللغة',
    close:    'إغلاق',

    fullscreen:      'ملء الشاشة',
    exitFullscreen:  'إنهاء ملء الشاشة',

    files:    'الملفات',
    pdfStory: 'قصة الأطفال (PDF)',
    pdfGuide: 'دليل المعلم العلمي (PDF)',

    preloading:  'جارٍ تحميل أصول اللعبة…',
    preloadDone: 'اكتمل التحميل — اللعبة جاهزة',
    langSwitchLabel: 'English',
  },
};

/**
 * تُرجع نصاً مترجمّاً حسب اللغة المطلوبة (أو اللغة الحالية للعبة).
 * @param {string} key
 * @param {'ar'|'en'} [lang]
 */
function t(key, lang) {
  const resolved = lang || (window.State && window.State.language) || 'en';
  const dict = I18N[resolved] || I18N.en;
  return dict[key] ?? I18N.en[key] ?? key;
}

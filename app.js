const arabicPack = document.querySelector('.arabic')
const englishPack = document.querySelector('.english')
const amharicPack = document.querySelector('.amharic')

const surahName = document.querySelector('.surahName')
const ayahNumbr = document.querySelector('.ayahNumb')
const but = document.querySelector('.but')

const arabicApiURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak.json';
const englishApiUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-mustafakhattaba.json';
const amharicApiUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/amh-muhammedsadiqan.json';


const suraNames = ['سُوْرَۃُ الفَاتِحَة','سُوْرَۃُ البَقَرَة','سُوْرَۃ آلِ عِمْرَان','سُوْرَۃُ النِّسَاء','سُوْرَۃُ المَائِدَة','سُوْرَۃُ الأَنْعَام','سُوْرَۃُ الأَعْرَاف','سُوْرَۃُ الأَنْفَال','سُوْرَۃُ التَّوْبَة','سُوْرَۃ يُونُس','سُوْرَۃ هُود','سُوْرَۃ يُوسُف','سُوْرَۃ الرَّعْد','سُوْرَۃُ إِبْرَاهِيم','سُوْرَۃُ الحِجْر','سُوْرَۃُ النَّحْل','سُوْرَۃُ الإِسْرَاء','سُوْرَۃ الكَهْف','سُوْرَۃ مَرْيَم','سُوْرَۃ طٰهٰ','سُوْرَۃُ الأَنْبِيَاء','سُوْرَۃ الحَجّ','سُوْرَۃُ المُؤْمِنُون','سُوْرَۃ النُّور','سُوْرَۃ الفُرْقَان','سُوْرَۃُ الشُّعَرَاء','سُوْرَۃُ النَّمْل','سُوْرَۃُ القَصَص','سُوْرَۃُ العَنْكَبُوت','سُوْرَۃ الرُّوم','سُوْرَۃ لُقْمَان','سُوْرَۃُ السَّجْدَة','سُوْرَۃُ الأَحْزَاب','سُوْرَۃ سَبَأ','سُوْرَۃ فَاطِر','سُوْرَۃ يٰس','سُوْرَۃُ الصَّافَّات','سُوْرَۃ ص','سُوْرَۃُ الزُّمَر','سُوْرَۃ غَافِر','سُوْرَۃ فُصِّلَت','سُوْرَۃُ الشُّورىٰ','سُوْرَۃُ الزُّخْرُف','سُوْرَۃ الدُّخَان','سُوْرَۃ الجَاثِيَة','سُوْرَۃُ الأَحْقَاف','سُوْرَۃ مُحَمَّد','سُوْرَۃُ الفَتْح','سُوْرَۃُ الحُجُرَات','سُوْرَۃ ق','سُوْرَۃُ الذَّارِيَات','سُوْرَۃ الطُّور','سُوْرَۃُ النَّجْم','سُوْرَۃُ القَمَر','سُوْرَۃ الرَّحْمَٰن','سُوْرَۃُ الوَاقِعَة','سُوْرَۃُ الحَدِيد','سُوْرَۃُ المُجَادِلَة','سُوْرَۃُ الحَشْر','سُوْرَۃُ المُمْتَحَنَة','سُوْرَۃُ الصَّفّ','سُوْرَۃُ الجُمُعَة','سُوْرَۃُ المُنَافِقُون','سُوْرَۃُ التَّغَابُن','سُوْرَۃُ الطَّلَاق','سُوْرَۃُ التَّحْرِيم','سُوْرَۃُ المُلْك','سُوْرَۃ القَلَم','سُوْرَۃ الحَاقَّة','سُوْرَۃُ المَعَارِج','سُوْرَۃ نُوح','سُوْرَۃُ الجِنّ','سُوْرَۃُ المُزَّمِّل','سُوْرَۃُ المُدَّثِّر','سُوْرَۃُ القِيَامَة','سُوْرَۃُ الإِنْسَان','سُوْرَۃُ المُرْسَلَات','سُوْرَۃُ النَّبَأ','سُوْرَۃُ النَّازِعَات','سُوْرَۃ عَبَسَ','سُوْرَۃُ التَّكْوِير','سُوْرَۃُ الإِنْفِطَار','سُوْرَۃُ المُطَفِّفِين','سُوْرَۃُ الإِنْشِقَاق','سُوْرَۃُ البُرُوج','سُوْرَۃُ الطَّارِق','سُوْرَۃُ الأَعْلَىٰ','سُوْرَۃُ الغَاشِيَة','سُوْرَۃُ الفَجْر','سُوْرَۃُ البَلَد','سُوْرَۃُ الشَّمْس','سُوْرَۃُ اللَّيْل','سُوْرَۃُ الضُّحَىٰ','سُوْرَۃُ الشَّرْح','سُوْرَۃُ التِّين','سُوْرَۃُ العَلَق','سُوْرَۃُ القَدْر','سُوْرَۃُ البَيِّنَة','سُوْرَۃُ الزَّلْزَلَة','سُوْرَۃُ العَادِيَات','سُوْرَۃُ القَارِعَة','سُوْرَۃُ التَّكَاثُر','سُوْرَۃُ العَصْر','سُوْرَۃُ الهُمَزَة','سُوْرَۃُ الفِيل','سُوْرَۃ قُرَيْش','سُوْرَۃُ المَاعُون','سُوْرَۃُ الكَوْثَر','سُوْرَۃُ الكَافِرُون','سُوْرَۃُ النَّصْر','سُوْرَۃُ المَسَد','سُوْرَۃُ الإِخْلَاص','سُوْرَۃُ الفَلَق','سُوْرَۃُ النَّاس'];


function dataRetrieve() {
  let ran = Math.floor(Math.random()*6236);

  //fetch the quran in arabic version
  fetch (arabicApiURL)
  .then(res => res.json())
  .then(data =>  {

    let surahNum = data.quran[ran].chapter;
    let ayahNum = data.quran[ran].verse;

    //display the surah and ayah values
    if (surahNum) {
      surahName.innerHTML = suraNames[surahNum-1];
      ayahNumbr.innerHTML = ayahNum;
    }

    //set a text so that the velue is displayed on the arabic placeholder
    const verseArabic = `<h3>${data.quran[ran].text} </h3>`;
    arabicPack.innerHTML = verseArabic;
    })
  .catch(err => console.log(err));


  //fetch the english translation
  fetch (englishApiUrl)
  .then(res => res.json())
  .then(data => {

    let surahNum = data.quran[ran].chapter;
    let ayahNum = data.quran[ran].verse;

    //set the text for english placeholder
    const verseEnglish = `<h3>${data.quran[ran].text} <br></h3>`;

    englishPack.innerHTML = verseEnglish;
    })
  .catch(err => console.log(err));



  //fetch the amharic translation
  fetch (amharicApiUrl)
  .then(res => res.json())
  .then(data => {

    let surahNum = data.quran[ran].chapter;
    let ayahNum = data.quran[ran].verse;

    //set the text value for the amharic place holder
    const verseEnglish = `<h3>${data.quran[ran].text} <br></h3>`;

    amharicPack.innerHTML = verseEnglish;
    })
    .catch(err => console.log(err));
}

//have a verse waiting when the page loads
dataRetrieve();

//when the button is clicked get the arabic, english and amharic translations
but.addEventListener('click', (e)=> {
  e.preventDefault();
  dataRetrieve();
})
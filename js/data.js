export const quizzes = [
  { number: 1, show: false, name: 'くるま', wordCount: 3, photo: "https://images.pexels.com/photos/18639194/pexels-photo-18639194/free-photo-of-vintage-yellow-car-with-eyes-and-advertisement.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { number: 2, show: false, name: 'ぱとかー', wordCount: 4, photo: "https://media.istockphoto.com/id/860991168/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E7%8F%BE%E4%BB%A3%E3%81%AE%E9%83%BD%E5%B8%82%E8%AD%A6%E5%AF%9F%E3%83%91%E3%83%88%E3%83%AD%E3%83%BC%E3%83%AB%E8%BB%8A%E4%B8%A1%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88.jpg?s=1024x1024&w=is&k=20&c=G6xfntXAWF04F1ni8HtGgY23PUd5gyHbSS9Y9PrqsGw="},
  { number: 3, show: false, name: 'しょうぼうしゃ', wordCount: 7, photo: "https://as2.ftcdn.net/v2/jpg/03/01/40/01/1000_F_301400138_Xse8uaaYP0WsyPinGK5mFnI4xbsr9tvW.jpg"},
  { number: 4, show: false, name: 'きゅうきゅうしゃ', wordCount: 8, photo: "https://as1.ftcdn.net/v2/jpg/07/00/10/72/1000_F_700107239_e0OPzuabjXhoV7DGtmyf8TO4PPj11lTQ.webp"},
  { number: 5, show: false, name: 'じてんしゃ', wordCount: 5, photo: "https://as2.ftcdn.net/jpg/06/23/78/51/1000_F_623785169_rfcSDYjGrvxnkK9eg52OsU6G0m1juC21.jpg"}
];

export const hrgn = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "わ", "を", "ん"];

export const states = ["initial-state", "game-state", "win-state", "end-state"];

export const translations = {
  en: { 
    start: "Start",
    rule: "Rule", 
    ruleDescription: "Look at the picture and guess the word!<br><br>If you complete all five, you can catch a Pokemon!<br><br>If you get the same word wrong three times, it's game over, so use the hint button!",
    closeButton: "Close",
    question: "Question:",
    try: "Try: ",
    answer: "Answer: ",
    hint: "Hint",
    award: "Well Done!! Click Here!",
    next: "Next",
    back: "Back to Top",
    winMessage: "",
    endMessage: "The correct answe is..",
  },
  jp: { 
    start: "スタート", 
    rule: "ルール", 
    ruleDescription: "えをみて、ことばをあてよう！<br><br>５もんぜんぶせいかいするとポケモンをゲットできるゾ！<br><br>おなじたんごを３かいまちがえるとゲームオーバーなので、ヒントボタンをかつようしよう！",
    closeButton: "とじる",
    question: "もんだい： ",
    try: "とらい： ",
    answer: "こたえ：",
    hint: "ヒント",
    award: "おめでとう！!ここをクリックしてね！",
    next : "つぎへ",
    back: "メニューにもどる",
    winMessage: "をゲットしたよ！",
    endMessage: "ざんねん！せいかいは..",
  }
};

export const pokemons = [
  {
    name: "ケーシィ",
    englishName: "Abra",
    imageUrl: "abra.png"
  },
  {
    name: "フシギダネ",
    englishName: "Bulbasaur",
    imageUrl: "bulbasaur.png"
  },
  {
    name: "ヒトカゲ",
    englishName: "Charmander",
    imageUrl: "charmander.png"
  },
  {
    name: "ピッピ",
    englishName: "Clefairy",
    imageUrl: "clefairy.png"
  },
  {
    name: "イシツブテ",
    englishName: "Geodude",
    imageUrl: "geodude.png"
  },
  {
    name: "ガーディ",
    englishName: "Growlithe",
    imageUrl: "growlithe.png"
  },
  {
    name: "プリン",
    englishName: "Jigglypuff",
    imageUrl: "jigglypuff.png"
  },
  {
    name: "ポッポ",
    englishName: "Pidgey",
    imageUrl: "pidgey.png"
  },
  {
    name: "ピカチュー",
    englishName: "Pikachu",
    imageUrl: "pikachu.png"
  },
  {
    name: "コダック",
    englishName: "Psyduck",
    imageUrl: "psyduck.png"
  },
  {
    name: "ゼニガメ",
    englishName: "Squirtle",
    imageUrl: "squirtle.png"
  },
];
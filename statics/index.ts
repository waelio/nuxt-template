import { /*fasEarthAmericas,*/ fasFlask } from "@quasar/extras/fontawesome-v6";
import { QSpinnerGears } from 'quasar'

export const links1 = [
  { icon: "person", text: "navigation.Profile", dist: "/auth/profile" },
  { icon: "star_border", text: "navigation.Favorites", dist: "/auth/favorites" },
  { icon: "settings", text: "navigation.SettingsPageTitle", dist: "/settings" },
  { icon: "info", text: "navigation.AboutPageTitle", dist: "/about" },
  { icon: "mail", text: "navigation.Messages", dist: "/user/inbox" },
  { icon: "contact_page", text: "navigation.ContactPageTitle", dist: "/contact" },

];
export const links2 = [
  { icon: "web", text: "Our blog", dist: "/blog" },
  { icon: fasFlask, text: "Science", dist: "/" },
];
export const links3 = [
  { icon: "", text: "navigation.SettingsPageTitle", dist: '/settings' },
  { icon: "", text: "Send feedback", dist: '/contact' },
  { icon: "help", text: "Help", dist: "/help" },
];
export const projects = [
  { key: 'FavsShuffler', value: 'FavsShuffler', selected: false },
  { key: 'Sudoku17', value: 'Sudoku17', selected: false },
  { key: 'PicMyMenu.com', value: 'PicMyMenu.com', selected: false },
  { key: 'Api.PicMyMenu.com', value: 'PicMyMenu.com API', selected: false },
  { key: 'QuranInPixels', value: 'Quran in Pixels', selected: false },
  { key: 'TulipGlowShop', value: 'Tulip Glow Shop', selected: false },
  { key: 'Waelio.com', value: 'Waelio.com Site', selected: false },
]

export const sponsors = [
  { name: 'Quasar', img: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg', url: 'https://quasar.dev' },
  { name: 'Vue', img: 'https://vuejs.org/images/logo.png', url: 'https://vuejs.org/' },
  { name: 'Amazon', img: 'https://d1.awsstatic.com/training-and-certification/Certification%20Badges/AWS-Certified_Cloud-Practitioner_512x512.bc006f14f986fa4f3ca238b0b62be458ce1fb5ce.png', url: 'https://aws.amazon.com' },
  { name: 'Amplify', img: 'https://docs.amplify.aws/assets/ogp.jpg', url: 'https://aws.amazon.com/amplify/' },
  { name: 'Node', img: 'https://nodejs.org/static/images/logo.svg', url: 'https://nodejs.org/' },
  { name: 'MongoDB', img: 'https://infinapps.com/wp-content/uploads/2018/10/mongodb-logo.png', url: 'https://www.mongodb.com/' },
  { name: 'Material Design', img: 'data:image/png;base64,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', url: 'https://material.io/' }
]

export const dialogDefaults = {
  title: 'Loading ...',
  dark: false,
  message: '0%',
  progress: {
    spinner: QSpinnerGears
  },
  persistent: false, // we want the user to not be able to close it
  ok: false,
}

export const notifyDefaults = {
  timeout: 10000,
  position: 'top',
}

export const loadingDefaults = {
  spinner: QSpinnerGears,
  message: 'Processing ...',
}

export const loadingBarDefaults = {
  color: 'primary',
  size: '10px',
  position: 'top',
}

export const defaultStyles = {
  info: {
    icon: 'info',
    color: 'info',
    type: 'info',
  },
  success: {
    icon: 'check',
    color: 'positive',
    type: 'positive',
  },
  warning: {
    icon: 'warning',
    color: 'warning',
    type: 'warning',
  },
  error: {
    icon: 'announcement',
    color: 'negative',
    type: 'negative',
  },
}

export function c(can: (arg0: string, arg1: string) => void) {
  can('read', 'post');
  can('update', 'post');
  can('add', 'post');
}
// import materialIcons from 'quasar/icon-set/svg-material-icons'
// import materialIconsRound from 'quasar/icon-set/svg-material-icons-round'

export const QuasarOptions = {
  plugins: [
    'AppFullscreen',
    'Dialog',
    'Loading',
    'LoadingBar',
    'BottomSheet',
    'Notify',
  ],
    // iconSet: {
    //   ...materialIcons,
    //   colorPicker: materialIconsRound.colorPicker,
    // },
    extras: {
    font: 'roboto-font',
      fontIcons: ['material-icons'],
        animations: 'all',
    },
  config: {
    dark: false,
    },
  // @ts-ignore
  components: {
    defaults: {
      QBtn: {
        glossy: true,
        },
    },
  },
}
export default QuasarOptions
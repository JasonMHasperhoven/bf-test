const colors = {
  // primary: '#2dbcbe',
  // primary: '#24b47e',
  // primary: '#14b372',
  // primary: '#0080D5',
  // primary: '#00C47E',

  // // to support js-sdk Button
  // primaryShaded: darken(0.1, '#00C47E'),
  // secondary: 'white',

  // grey: '#f6f6f6',
  // link: '#2d79be',
  // disabled: '#c1c1c1',
  // bg: '#f1f3f4',
  // bodyBg: '#273640',
  // border: '#ddd',
  // border: '#e8e9ea',
  // error: '#f9756e',
  // error: '#F75858',
  // // error: '#c41c00',
  // success: '#00f39a',
  // warning: '#ffc800',
  // // text: mix(0.055, /* textMixShade */ '#0043ff', /* textBaseShade */ '#333'),
  // text: 'rgb(51, 51, 51)',

  bodyBg: '#273640',
  secondaryBg: '#1b262d',
  secondaryBg1: '#1f2b33',
  secondaryBg2: '#212e36',
  secondaryBg3: '#212e36',
  primaryTextColor: '#fff',
  primaryTextColor1: '#fff',
  primaryTextColor2: '#fff',
  primaryTextColor3: '#969b9e',
  buyColor: '#16b157',
  sellColor: '#f05359',
  linkColor: '#82baf6',
  errorColor: '#5c3f46',
  bannerBg: 'linear-gradient(81.3deg,#102331 -5.27%,#4166bc 88.44%)',
  bannerBg1: 'linear-gradient(77.89deg,#172d3e -5.27%,#4166bc 88.44%)',
  bannerTextColor: '#eaeaea',
  logoTextColor: '#fff',
  logoLeafTopColor: '#16b157',
  logoLeafBottomColor: '#98e35d',
  sidenavListBorderColor: '#2a3c47',
  sidenavListItemColor: '#c4c7c9',
  sidenavListItemBgColor: '#242e34',
  sidenavListItemBorderColor: '#2a3c47',
  sidenavListItemHoverBgColor: '#28343a',
  sidenavListItemIconColor: '#c4c7c9',
  sidenavListItemActiveBgColor: '#36464f',
  separatorColor: 'hsla(0,0%,100%,0.2)',
  pulseMessageYourBg: '#344a5c',
  pulseMessageOtherBg: '#273640',
  buyColorRgb: '22,177,87',
  sellColorRgb: '240,83,89',
};

const theme = {
  spacing: (multiplier) => `${(multiplier || 1) * /* spacingUnit */ 16}px`,
  radius: '5px',
  cardShadow: '0 1px 3px rgba(0, 0, 0, .12)',
  barHeight: '54px',
  ...colors,
};

export default theme;
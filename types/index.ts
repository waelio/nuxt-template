import { MediaFile, RefreshToken, Tweet } from "@prisma/client"
import { NavigationGuard, RouteLocationNormalized } from "~/.nuxt/vue-router"

export type TKey = number
export type TColor = string
export type TName = string
export type TLink = string
export type TYear = string
export type TText = string
export type TValue = string
export type TDescription = string

export interface Window {
  Etherium: any;
  web3: any;
}
/** User Roles from casl */
export interface IRole {
  name: TName;
  subject: TName;
  actions: TName[];
  inverted?: boolean;
  conditions?: TName[]
  fields?: TName[];
  reason?: TName;
}

/** Loght Modes */
export enum LightModes {
  Dark = 'dark',
  Light = 'light',
  System = 'auto'
}

/** Enum Note Actions */
export enum ENoteAcions {
  Show = 'show',
  Hide = 'hide',
  success = 'success',
  Info = 'info',
  warning = 'warning',
  Errror = 'error',
  Loading = 'loading'
}
/** Loding Defaults */
export type TLoadingDefaults = {
  spinner: string;
  message: string;
}
/** Notify Positions */
export enum EPOSITIONS {
  top = 'top',
  topRight = 'top-right',
  topLeft = 'top-left',
  bottom = 'bottom',
  bottomRight = 'bottom-right',
  bottomLeft = 'bottom-left',
  right = 'right',
  left = 'left',
  center = 'center'
}
/** Education History interface */
export interface IHistory {
  key: TKey,
  color: TColor,
  name: TName,
  link: LINK,
  year: TYear,
  text: string
}
/** Project interface */
export interface IProject {
  key: string
  value: TValue,
  selected: boolean
}
export interface ISponsor {
  name: string,
  img: string,
  url: string
}
export interface IWorkOptions {
  name?: "SHA-256" | "PBKDF2";
  encode?: "base64" | "utf8" | "hex";
  salt?: any;
  hash?: string;
  length?: number;
}
/** Authentication Strategies */
export enum ENetworksNames {
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
  local = "local",
  passport = "passport",
}

/** Social login user scopes */
export enum EScopesNames {
  profile = "profile",
  social = "social",
  email = "email",
  fullname = "fullname",
}
/** Social login scope */
export interface IScope {
  name?: string;
  network: Partial<ENetworksNames>;
  scope: Partial<EScopesNames>;
  icon?: string;
  emitName?: string | Function;
}
export type TScope = IScope

export interface IHARF {
  name: string;
  weight: number;
  value: string
  description?: string;
  color?: string;
  encoding?: string;
}
export interface IkALEMAT {
  horuf: IHARF[];
}
export interface IAYA {
  Kalemat: IkALEMAT[];
}
export interface ISURA {
  Ayat: IAYA[];
}
export interface IQuran {
  Surah: ISURA[];
}
export interface ISTATE {
  quran: IQuran;
  Surah: ISURA[];
  Index: IQuran;
}

export interface IQ2B {
  state: ISTATE
}
export interface LINK {
  text: string;
  icon: string;
}

export interface IHistory {
  key: TKey,
  color: TColor,
  name: TName,
  link: LINK,
  year: TYear,
  text: string
}
export interface IProjects {
  key: string
  value: TValue,
  selected: boolean
}
export type TProjects = IProjects
export interface ISponsors {
  name: string,
  img: string,
  url: string
}
export type TSponsors = ISponsors
export interface TransactionInterface {
  addressFrom: string;
  addressTo: string;
  amount: number;
  message: string;
  keyword: string;
  timestamp: string;
  url?: string;
  gifUrl?: string;
  receiver: string;
  sender: string;
}
export type Transaction = TransactionInterface & {
  id?: string | number;
};
export type Transactions = Transaction[];

export interface IUSER {
  [x: string]: any
  id?: string;
  email: string;
  username: string;
  name?: string;
  handle?: string;
  password: string;
  first_name?: string;
  last_name?: string;
  profileImage?: string;
  role: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  // Refresh token
  refreshToken?: RefreshToken[];

  //Auth0
  auth0Id?: string;

  // Tweet
  tweet?: Tweet[];
  // MediaFiles
  mediaFiles?: MediaFile[]
}
export type TUSER = IUSER


export interface IPermession {
  id?: string;
  action: string | string[];
  subject: string | string[];
  fields?: string | string[];
  conditions?: string[];
  inverted?: boolean;
  reason?: string;
  permissionId: string;
  createdAt?: string;
  updatedAt?: string;
}
export type TPermession = IPermession

export interface IToken {
  userId: string;
  iat: number;
  exp: number;
}
export type TToken = {
  id: string
  token: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}


export interface ISubscription {
  id: string;
  endpoint: string;
  expirationTime: string;
  keys_p256dh: string;
  keys_auth: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: object;
}

export type TReshreshToken = {
  id: string;
  token: string;
  userId: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IPOST {
  [x: string]: any
  userId: number,
  id: number,
  title: string
}

export interface RequestIPOST {
  data: IPOST
}

export interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}

export enum eCaslAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}
export enum eCaslSubject {
  CATEGORY = 'Category',
  LIKES = 'Likes',
  MEDIAFILE = 'MediaFile',
  USER = 'User',
  PERMISSIONS = 'Permissions',
  POST = 'Post',
  ROLES = 'Roles',
  TWEET = 'Tweet'
}
// CASL
export type TCaslActions = eCaslAction.CREATE | eCaslAction.READ | eCaslAction.UPDATE | eCaslAction.DELETE;
export type TCaslSubjects = eCaslSubject.CATEGORY | eCaslSubject.LIKES | eCaslSubject.MEDIAFILE | eCaslSubject.PERMISSIONS | eCaslSubject.POST | eCaslSubject.ROLES | eCaslSubject.TWEET | eCaslSubject.USER;


export interface ISubscription {
  endpoint: string;
  expirationTime: string;
  keys: {
    p256dh: string
    auth: string
  }
}
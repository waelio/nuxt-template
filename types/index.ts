import { MediaFile, RefreshToken, Tweet } from "@prisma/client"
import { NavigationGuard, RouteLocationNormalized } from "~/.nuxt/vue-router"

export type KeyT = number
export type ColorT = string
export type NameT = string
export type YearT = string
export type TextT = string
export type ValueT = string
export type DescriptionT = string

export interface WindowI {
  Etherium: any;
  web3: any;
}
/** User Roles from casl */
export interface RoleI {
  name: NameT;
  subject: NameT;
  actions: NameT[];
  inverted?: boolean;
  conditions?: NameT[]
  fields?: NameT[];
  reason?: NameT;
}

/** Loght Modes */
export enum LightModesE {
  Dark = 'dark',
  Light = 'light',
  System = 'auto'
}

/** Enum Note Actions */
export enum NoteAcionsE {
  Show = 'show',
  Hide = 'hide',
  success = 'success',
  Info = 'info',
  warning = 'warning',
  Errror = 'error',
  Loading = 'loading'
}
/** Loding Defaults */
export type LoadingDefaultsT = {
  spinner: string;
  message: string;
}
/** Notify Positions */
export enum PositionsE {
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
export interface HistoryI {
  key: KeyT,
  color: ColorT,
  name: NameT,
  link: LinkT,
  year: YearT,
  text: string
}
/** Project interface */
export interface IProject {
  key: string
  value: ValueT,
  selected: boolean
}
export interface SponsorI {
  name: string,
  img: string,
  url: string
}
export interface WorkOptionsI {
  name?: "SHA-256" | "PBKDF2";
  encode?: "base64" | "utf8" | "hex";
  salt?: any;
  hash?: string;
  length?: number;
}
/** Authentication Strategies */
export enum NetworksNamesE {
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
  local = "local",
  passport = "passport",
}

/** Social login user scopes */
export enum ScopesNamesE {
  profile = "profile",
  social = "social",
  email = "email",
  fullname = "fullname",
}
/** Social login scope */
export interface ScopeI {
  name?: string;
  network: Partial<NetworksNamesE>;
  scope: Partial<ScopesNamesE>;
  icon?: string;
  emitName?: string | Function;
}
export type ScopeT = ScopeI

export interface HarfI {
  name: string;
  weight: number;
  value: string
  description?: string;
  color?: string;
  encoding?: string;
}
export interface kalimatI {
  horuf: HarfI[];
}
export interface AyaI {
  Kalemat: kalimatI[];
}
export interface SuraI {
  Ayat: AyaI[];
}
export interface QuranI {
  Surah: SuraI[];
}
export interface StateI {
  quran: QuranI;
  Surah: SuraI[];
  Index: QuranI;
}

export interface Q2bI {
  state: StateI
}
export interface LinkT {
  text: string;
  icon: string;
}

export interface HistoryI {
  key: KeyT,
  color: ColorT,
  name: NameT,
  link: LinkT,
  year: YearT,
  text: string
}
export interface ProjectsI {
  key: string
  value: ValueT,
  selected: boolean
}
export type ProjectsT = ProjectsI
export interface SponsorsI {
  name: string,
  img: string,
  url: string
}
export type SponsorsT = SponsorsI
export interface TransactionInterfaceI {
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
export type TransactionT = TransactionInterfaceI & {
  id?: string | number;
};
export type TransactionsT = TransactionT[];

export interface UserI {
  [x: string]: any
  id?: string;
  email: string;
  username: string;
  handle?: string;
  password: string;
  first_name?: string;
  last_name?: string;
  profileImage?: string;
  role: string;
  // Refresh token
  refreshToken?: RefreshToken[];

  //Auth0
  auth0Id?: string;

  // Tweet
  tweet?: Tweet[];
  // MediaFiles
  mediaFiles?: MediaFile[]
}
export type UserT = UserI


export interface PermessionI {
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
export type PermessionT = PermessionI

export interface TokenI {
  userId: string;
  iat: number;
  exp: number;
}
export type TokenT = {
  id: string
  token: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}


export interface SubscriptionI {
  id: string;
  endpoint: string;
  expirationTime: string;
  keys_p256dh: string;
  keys_auth: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: UserI;
}

export type ReshreshTokenT = {
  id: string;
  token: string;
  userId: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface PostI {
  [x: string]: string | number
  userId: number | string,
  id: number,
  title: string
}

export interface RequestPostI {
  data: PostI
}

export interface RouteMiddlewareI {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}

export enum CaslActionE {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage'
}
export enum CaslSubjectE {
  ALL = 'all',
  ADMIN = 'admin',
  CATEGORY = 'category',
  LIKES = 'likes',
  MEDIAFILE = 'mediafile',
  PERMISSIONS = 'permissions',
  POST = 'post',
  ROLES = 'roles',
  REFRESH_TOKEN = 'reshresh_token',
  TWEET = 'tweet',
  USER = 'user',
}
// CASL
export type CaslActionsT = CaslActionE.CREATE | CaslActionE.READ | CaslActionE.UPDATE | CaslActionE.DELETE;
export type CaslSubjectsT = CaslSubjectE.CATEGORY | CaslSubjectE.LIKES | CaslSubjectE.MEDIAFILE | CaslSubjectE.PERMISSIONS | CaslSubjectE.POST | CaslSubjectE.ROLES | CaslSubjectE.TWEET | CaslSubjectE.USER | CaslSubjectE.ADMIN;

export interface CaslActionsI {
  actions: CaslActionsT
}
export interface CaslSubjectsI {
  actions: CaslSubjectsT
}

type KeysT = {
  p256dh: string
  auth: string
}
export interface SubscriptionI {
  endpoint: string;
  expirationTime: string;
  keys: KeysT
}
export type SubscriptionT = SubscriptionI
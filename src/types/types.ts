export type postType = {
    id: string | null,
    message: string | null | number,
    image: string | null,
    like: boolean
}
export type profileType = {
    userId: string | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: contactsType,
    photos: photosType
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null,
    large: string | null
}
export type userType = {
    id: string,
    name: string,
    status: string,
    photos: photosType,
    followed: boolean
}

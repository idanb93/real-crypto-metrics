export interface GithubRequest {
  owner: string
  repo: string
}

export interface GithubContributors {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  contributions: number
}

// Data Transfer Object - when you see DTO it means that interface came from the backend.
export interface GithubContributorsDTO {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
  gravatarId: string
  url: string
  htmlUrl: string
  followersUrl: string
  followingUrl: string
  gistsUrl: string
  starredUrl: string
  subscriptionsUrl: string
  organizationsUrl: string
  reposUrl: string
  eventsUrl: string
  receivedEventsUrl: string
  type: string
  siteAdmin: boolean
  contributions: number
}

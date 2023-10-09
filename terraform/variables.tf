variable "cloudflare_account_id" {
  description = "The Cloudflare account ID used to identify your Cloudflare account."
  type        = string
}

variable "cloudflare_domain" {
  description = "The domain name associated with your Cloudflare configuration."
  type        = string
}

variable "cloudflare_kv_name" {
  description = "The name of a specific Key-Value (KV) store in Cloudflare Workers used for data storage."
  type        = string
}

variable "cloudflare_worker_name" {
  description = "The name or identifier of a Cloudflare Worker script you want to deploy."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "The unique identifier (Zone ID) for a specific DNS zone in your Cloudflare account."
  type        = string
}

variable "twitch_client_id" {
  description = "The client ID associated with a Twitch API integration for authentication and authorization."
  type        = string
}

variable "twitch_client_secret" {
  description = "The client secret associated with a Twitch API integration."
  sensitive   = true
  type        = string
}

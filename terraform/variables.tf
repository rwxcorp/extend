variable "cloudflare_account_id" {
  description = "The Cloudflare account ID used to identify your Cloudflare account."
  type        = string
}

variable "cloudflare_domain" {
  description = "The domain name associated with your Cloudflare configuration."
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

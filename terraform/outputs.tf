output "worker_domain" {
  description = "The hostname of the Cloudflare worker domain"
  value = cloudflare_worker_domain.this.hostname
}


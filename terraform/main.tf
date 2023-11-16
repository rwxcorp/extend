terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      # source  = "terraform.local/local/cloudflare"
      version = ">=4.14.0"
    }
  }
}

resource "cloudflare_worker_script" "this" {
  account_id = var.cloudflare_account_id
  name       = var.cloudflare_worker_name
  content    = file("${path.module}/dist/bundle.js")
  module     = true
}

resource "cloudflare_worker_domain" "this" {
  account_id = var.cloudflare_account_id
  hostname   = "${cloudflare_worker_script.this.name}.${var.cloudflare_domain}"
  service    = cloudflare_worker_script.this.name
  zone_id    = var.cloudflare_zone_id
}

resource "cloudflare_worker_route" "this" {
  pattern     = "${cloudflare_worker_domain.this.hostname}/*"
  script_name = cloudflare_worker_script.this.name
  zone_id     = var.cloudflare_zone_id
}

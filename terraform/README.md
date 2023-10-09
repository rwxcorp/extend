## Requirements

| Name | Version |
|------|---------|
| cloudflare | >=4.14.0 |

## Providers

| Name | Version |
|------|---------|
| cloudflare | 4.14.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| cloudflare_worker_domain.this | resource |
| cloudflare_worker_route.this | resource |
| cloudflare_worker_script.this | resource |
| cloudflare_workers_kv_namespace.this | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| cloudflare\_account\_id | The Cloudflare account ID used to identify your Cloudflare account. | `string` | n/a | yes |
| cloudflare\_domain | The domain name associated with your Cloudflare configuration. | `string` | n/a | yes |
| cloudflare\_kv\_name | The name of a specific Key-Value (KV) store in Cloudflare Workers used for data storage. | `string` | n/a | yes |
| cloudflare\_worker\_name | The name or identifier of a Cloudflare Worker script you want to deploy. | `string` | n/a | yes |
| cloudflare\_zone\_id | The unique identifier (Zone ID) for a specific DNS zone in your Cloudflare account. | `string` | n/a | yes |
| twitch\_client\_id | The client ID associated with a Twitch API integration for authentication and authorization. | `string` | n/a | yes |
| twitch\_client\_secret | The client secret associated with a Twitch API integration. | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| worker\_domain | The hostname of the Cloudflare worker domain |

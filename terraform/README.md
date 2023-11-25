## Requirements

| Name | Version |
|------|---------|
| cloudflare | >=4.14.0 |

## Providers

| Name | Version |
|------|---------|
| cloudflare | >=4.14.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [cloudflare_worker_domain.this](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/worker_domain) | resource |
| [cloudflare_worker_route.this](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/worker_route) | resource |
| [cloudflare_worker_script.this](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/worker_script) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| cloudflare\_account\_id | The Cloudflare account ID used to identify your Cloudflare account. | `string` | n/a | yes |
| cloudflare\_domain | The domain name associated with your Cloudflare configuration. | `string` | n/a | yes |
| cloudflare\_worker\_name | The name or identifier of a Cloudflare Worker script you want to deploy. | `string` | n/a | yes |
| cloudflare\_zone\_id | The unique identifier (Zone ID) for a specific DNS zone in your Cloudflare account. | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| worker\_domain | The hostname of the Cloudflare worker domain |

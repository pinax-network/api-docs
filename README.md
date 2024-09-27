## API Docs

### OpenAPI Spec

> Copy the OpenAPI JSON files from the API repos to this root directory.

- [`tokens-openapi.json`](https://github.com/pinax-network/antelope-token-api/blob/main/static/%40typespec/openapi3/openapi.json)
- [`transactions-openapi.json`](https://github.com/pinax-network/antelope-transactions-api/blob/main/static/%40typespec/openapi3/openapi.json)

### Generate API Docs

```bash
$ bun generate.js
✅ created ./openapi3/eos-openapi.json
✅ created ./openapi3/kylin-openapi.json
✅ created ./openapi3/wax-openapi.json
```

### Test Docs

> Copy JSON OpenAPI content to the Swagger Editor.
> Make sure there are no errors.

<https://editor.swagger.io/>

### Deploy Docs

- <https://eos.api.pinax.network>
- <https://wax.api.pinax.network>
- <https://kylin.api.pinax.network>

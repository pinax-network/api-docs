// curl http://eos.antelope-token-api.pinax.mar-prod1.pinax.io/openapi | jq . > token-openapi.json
// curl http://eos.antelope-transactions-api.pinax.mar-prod1.pinax.io/ | jq . > transactions-openapi.json
// bun generate.js

import fs from "fs";
import transactionsOpenApi from "./transactions-openapi.json";
import tokenOpenApi from "./token-openapi.json";

const chains = ["EOS", "Kylin", "WAX"]

// Rename title
transactionsOpenApi.info.title = "Transactions API";
tokenOpenApi.info.title = "Token API";

// Set Tags as title
function replaceTags(openapi, tags) {
    for (const path in openapi.paths) {
        if (openapi.paths[path].get) {
            openapi.paths[path].get.tags = tags;
        }
    }
}
replaceTags(tokenOpenApi, [tokenOpenApi.info.title]);
replaceTags(transactionsOpenApi, [transactionsOpenApi.info.title]);

for (const chain of chains) {
    const openapi = {
        openapi: "3.0.3",
        info: {
            title: `${chain} API`,
            description: `Access a comprehensive collection of API endpoints for the ${chain} blockchain. To get started, obtain your API Key from the [Pinax App](https://app.pinax.network). For any questions or support, feel free to reach out to us on [Discord](https://discord.gg/pinax).`,
            version: "v0.1.0",
        },
        servers: [{ url: `https://${chain.toLowerCase()}.api.pinax.network/v1` }],
        tags: [
            { name: tokenOpenApi.info.title, description: "Token balances, transfers, holders & supply data", externalDocs: { url: "https://github.com/pinax-network/antelope-token-api" } },
            { name: transactionsOpenApi.info.title, description: "Transactions, actions & database operations data", externalDocs: { url: "https://github.com/pinax-network/antelope-transactions-api" } },
        ],
        paths: Object.assign(tokenOpenApi.paths, transactionsOpenApi.paths),
        components: {
            schemas: Object.assign(tokenOpenApi.components.schemas, transactionsOpenApi.components.schemas),
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "X-Api-Key"
                }
            }
        },
    }
    // delete tags
    for (const deleteTag of ["Usage"]) {
        for (const path in openapi.paths) {
            if (openapi.paths[path].get) {
                openapi.paths[path].get.tags = openapi.paths[path].get.tags.filter(tag => tag !== deleteTag);
            }
        }
    }
    // delete additional paths
    for (const deletePath of ["/version", "/metrics", "/head", "/health", "/openapi", "/version"]) {
        for (const path in openapi.paths) {
            if (openapi.paths[path]) {
                delete openapi.paths[deletePath];
            }
        }
    }
    const filename = `./openapi3/${chain.toLowerCase()}-openapi.json`
    console.log(`✅ created ${filename}`);
    fs.writeFileSync(`./openapi3/${chain.toLowerCase()}-openapi.json`, JSON.stringify(openapi, null, 2));
}


<h1 id="title" align="center">graphql-backend-task 👋</h1>

`graphql-backend-task` is a GraphQL API server built using Apollo Server and Node.js. It provides a set of queries to interact with various data sources defined in JSON files. The API is authenticated using Bearer tokens.

### 🔖 Table Of Contents

- 🌱 [Prerequisites](#prerequisites)
- ⏬ [Installing](#installing)
- 👨‍💻 [Example](#example)
- 👌 [Test](#test)
- 💡 [How To Contribute](#how-to-contribute)
- 📈 [Project Activity](#project-activity)
- 👤 [Author](#author)
- 🔏 [License](#license)

---

<h2 id="prerequisites">🌱 Prerequisites</h2>

- NPM/Yarn LTS
- NodeJs

[Back To The Top](#title)

---

<h2 id="installing">⏬ Installing</h2>

#### 💻 Desktop

If you use Linux, try running commands below as `sudo`

```sh
npm install
```

or

```sh
yarn install
```

[Back To The Top](#title)

<h2 id="example">👨‍💻 Example</h2>

#### Project structure

```sh
.env
.env.example
.gitignore
LICENSE
package.json
postman-json/
    GraphQL Backend Task.postman_collection.json
README.md
requirements.txt
src/
    auth.js
    data/
        action.json
        demoToken.json
        node.json
        resourceTemplate.json
        response.json
        trigger.json
    generate-token/
        generateJwtToken.js
    resolvers.js
    schema.js
    server.js
```

#### Comprehensive Query

```json
{
  "query": "query GetNode($nodeId: ID) { node(nodeId: $nodeId) { _id createdAt updatedAt name description parents {name} root trigger { _id name description params functionString resourceTemplateId createdAt updatedAt} responses { _id name description platforms tags createdAt updatedAt } actions postActions { _id name functionString description params resourceTemplateId resourceTemplate {_id name type key description schema integrationId functionString requestedVerification verified published createdAt updatedAt } createdAt updatedAt } position priority compositeId global colour redirect memberTagging memberTagging } }",
  "variables": {
    "nodeId": "6297172e70a0c165b989cd10"
  }
}
```

#### Basic Queries

1. Fetch all Nodes:

```json
{
  "query": "query getNodes { nodes {_id name description trigger {_id name} actions postActions { _id name functionString description params resourceTemplateId resourceTemplate {_id name type key description schema integrationId functionString requestedVerification verified published createdAt updatedAt } createdAt updatedAt } position priority compositeId global colour redirect memberTagging memberTagging }}"
}
```

2. Fetch all Actions:

```json
{
  "query": "query GetActions { actions {_id name description }}"
}
```

3. Fetch a Trigger by ID:

```json
{
  "query": "query GetTrigger($triggerId: ID) { trigger(triggerId: $triggerId) {_id  name description }}",
  "variables": {
    "triggerId": "629712b210f525845e1a92f8"
  }
}
```

4. Fetch all Responses:

```json
{
  "query": "query GetResponses { responses {_id name description platforms tags }}"
}
```

5. Fetch a Response by ID:

```json
{
  "query": "query GetResponse($responseId: ID) { response(responseId: $responseId) {_id name description platforms tags }}",
  "variables": {
    "responseId": "6297171270a0c17c5689cd0c"
  }
}
```

6. Fetch all Resource Templates:

```json
{
  "query": "query GetResourceTemplates { resourceTemplates {_id name type description schema requestedVerification verified published integrationId functionString key }}"
}
```

7. Fetch a Resource Template by ID:

```json
{
  "query": "query GetResourceTemplate($resourceTemplateId: ID) { resourceTemplate(resourceTemplateId: $resourceTemplateId) {_id name type description schema requestedVerification verified published integrationId functionString key }}",
  "variables": {
    "resourceTemplateId": "61e9ba20f9b581f25a2dbf51"
  }
}
```

8. Random query:

```json
{
  "query": "query Node($nodeId: ID!) { node(nodeId: $nodeId) { name triggerId trigger {_id resourceTemplateId } responseIds actionIds parentIds parents { name description actionIds parentIds responseIds } } } ",
  "variables": {
    "nodeId": "62971a9570a0c12bb389cd13"
  }
}
```

[Back To The Top](#title)

<h2 id="test">👌 Test</h2>

- Fork it 😎
- Clone forked repository: `git clone https://github.com/username/forked-name.git`
- Install the dependencies from root directory: `npm install`
- Rename `.env.example` to `.env`
- Now run: `npm run test` & see the results 😎

[Back To The Top](#title)

<h2 id="how-to-contribute">💡 How To Contribute</h2>

- Fork it 😎
- Create a feature branch: `git checkout -b my-feature`
- Add your changes: `git add .`
- Commit your changes: `git commit -m 'My new feature'`
- Push to the branch: `git push origin my-feature`
- Submit a pull request

<p align="center">
<i>Contributions, issues and features requests are welcome!</i><br />
<i>📮 Submit PRs to help solve issues or add features</i><br />
<i>🐛 Find and report issues</i><br />
<i>🌟 Star the project</i><br />
</p>

[Back To The Top](#title)

<<h2 id="author">👤 Author</h2>

🤓 **Md. Muhtasim Fuad Fahim <mdmuhtasim.fahim@gmail.com>**

- Github: [@mdmuhtasimfuadfahim](https://github.com/mdmuhtasimfuadfahim)
- LinkedIn: [@mdmuhtasimfuadfahim](https://www.linkedin.com/in/mdmuhtasimfuadfahim)

[Back To The Top](#title)

---

<h2 id="license">🔏 License</h2>

Copyright © 2023 [Md. Muhtasim Fuad Fahim](https://github.com/mdmuhtasimfuadfahim)

This project is licensed by [GNU License](https://www.gnu.org/licenses/gpl-3.0.en.html).

[Back To The Top](#title)

---

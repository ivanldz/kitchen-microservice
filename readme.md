# Kitchen microservice

Part of a challenge involving the creation of 3 microservices responsible for managing a culinary API. These microservices collectively handle order management and its states, inventory management, and frontend interaction. This microservice, specifically, is responsible for orders management.

## About the Project

The project is structured following the Clean Architecture pattern, which is a software design approach that aims to create highly independent, decoupled, and layered systems, facilitating code understanding, maintenance, and evolution.

### Folder Structure

- Domain: System policies. Entities and repositories that will exist in the application are declared here.
- Application: Business logic of the system. Houses all the use cases of the application.
- Infrastructure: Everything outside the central business logic of our application. Connection and configuration of the database; real implementation of domain elements and use of application services by injecting these new implementations.

## API Reference

#### Valid stock

```http
  POST /api/order
```

- **Response**:
  | Type | Description|
  :------- | :------------ |
  | `Order` |Order generated with `queued` status. |

- **Ejemplo**

```json
{
  "status": "queued",
  "recipe": "646ec8181c2d7519cc8c1892",
  "_id": "6470e5ca5334b8c2122c0908"
}
```

#### Get orders

```http
  GET api/order/${page}
```

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `page`    | `number` | **Required**. page |

| Query    | Type     | Description                                                            |
| :------- | :------- | :--------------------------------------------------------------------- |
| `status` | `string` | **optional**. Comma-separated order statuses (status=preparing,queued) |

- **Response**:
  | Type | Description|
  :------- | :------------ |
  | `Page` | Responds with a page of orders. |

#### Get recipes

```http
  GET /api/recipe/${page}
```

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `page`    | `number` | **Required**. page |

- **Response**:
  | Type | Description|
  :------- | :------------ |
  | `Page` | Responds with a page of recipes.|

#### Prepare order

```http
  PUT /api/order/prepare
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `orderId` | `string` | **Required**. Order ID to prepare |

- **Response**:
  | Type | Description|
  :------- | :------------ |
  | `Order` | Order with the change.|

#### Prepare order

```http
  PUT /api/order/finish
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `orderId` | `string` | **Required**. Order ID to finish. |

- **Response**:
  | Type | Description|
  :------- | :------------ |
  | `Order` | Order with the change.|

## Usage

You can use the Dockerfile in the root of the project to run the application, or you can use the docker-compose.yaml to run the app along with a mongoose service.

You can also install everything locally using:

```bash
  yarn install
  yarn dev
```


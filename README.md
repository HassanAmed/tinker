
## Description
**Tinker** - job processor for offers 
*What it does*
- uses offers payloads (to mimic http requests)
- validate offers from different providers
- transform them to a single entity
- Log (warn) on failed validation or transformation
- Logs all successfully transformed entities

## Installation

```bash
$ npm install
```

## Running the app
This is a [NestJs standalone application](https://docs.nestjs.com/standalone-applications). Running it will trigger the job to process offers
```bash
$ npm run start
```

## Design
##### Strategy Pattern:
I used IProvider interface and its implementations (Provider1, Provider2) to employ strategy pattern. Different providers can have their own implementation of offer fetching, validation, and transformation, and the specific implementation can be switched easily without affecting the service that depends on it.

##### Scalability
We can inject our OfferService with as many strategies as we wish each having its our specific implementation for fetching, validation and transformation of offers to base offer entity thus making it scaleable for many providers.

##### Providers: 
Providers follow a common interface (IProvider), ensuring a consistent contract for the OfferService to rely on.

##### Service Logic:
OfferService processes offers by iterating through the injected providers. Each provider (Provider1, Provider2) fetches offer data, validates it, and transforms it into a common OfferDto format. The OfferService then converts these DTOs into Offer entities, which can be saved in the database.

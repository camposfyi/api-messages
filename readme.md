###api-messages
**api-messages** is a small library to unify messages into a single place. The library contains a small set of generic messages. You must provide a file with your custom messages in the `configure` method.

####Install:
```
npm install --save api-messages
```


####Initialize:
```javascript
import ApiMessages from 'api-messages'
const apiMessages = new ApiMessages();
apiMessages.configure({
  source: 'path-to-your-source.json'
});
```

####Usage
Give the path of the message from the source json file.
```javascript
const messsage = apiMessages.get('errors.authentication.emailNotVerified');
```

####Interpolation
You can interpolate values by passing a second object with key/values to the `get` function.<br>
Interpolation property names in your configuration file must match object property names. Interpolation properties are surrounded as folows: `#{propertyName}`.<br>

> Your typescript code

```typescript
const messsage = apiMessages.get('errors.authentication.emailNotVerified', {
  name: 'John',
  email: 'john@email.com'
});
```

> Your json configuration file
```json
{
  "errors": {
    "authentication": {
      "emailNotVerified": "Hi #{name}. Your email #{email} has not been verified."
    }
  }
}
```

> Produced output
```text
  Hi John. Your email john@email.com has not been verified.
```


#### Defaults
The library offers a small set of generic error messages.
```javascript
const message = apiMessages.defaults.http.ok;
```

All:
```javascript
http: {
    ok: 'Success.',
    created: 'Operation successful.',
    badRequest: 'The server could not understand your request, please check your syntax.',
    unauthorized: 'Please sign in before proceeding with this action.',
    forbidden: 'You are not allowed to access this resource.',
    notFound: 'the item you are looking for was not found',
    conflict: 'There is a conflict with an existing record, please check your request.',
    internalServerError: 'An error has occurred. If the problem persists, contact customer support.'
  }
```


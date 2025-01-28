# What is Middleware?
Middleware in ExpressJS refers to functions that execute during the lifecycle of a request to the server. Middleware functions can:

Execute any code.
Modify the request and response objects.
End the request-response cycle.
Call the next middleware function in the stack.
Why use Middleware?
To process incoming request bodies (e.g., `body-parser` to handle `POST` data).
To log requests, authenticate users, handle errors, etc.

# When is Middleware Called?
Middleware is executed in the order it’s defined. It's called every time the route it’s associated with matches the request.
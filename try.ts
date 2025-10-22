import { Result } from "@praha/byethrow";
import { UnexpecetedError } from "./errors";

const safeDatabaseOperation = Result.try({
	try: (id: string) => {
		return `Data for ${id}`;
	},
	catch: (error: Error) => {
		return new UnexpecetedError({ cause: error });
	},
});

// Usage
const result = await safeDatabaseOperation("123");
if (Result.isFailure(result)) {
	// You now have a clean UnexpectedError with your application's stack trace
	// instead of deep library stack traces
	console.error(result.error.stack);
	// Original error is still accessible
	console.error(result.error.cause);
}

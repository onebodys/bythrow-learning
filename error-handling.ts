import { Result } from "@praha/byethrow";

const riskyOperation = () => Result.fail(new Error("Operation failed"));

const fallback = () => Result.succeed("Default Value");

const result = Result.pipe(riskyOperation(), Result.orElse(fallback));

if (Result.isSuccess(result)) {
	console.log(result.value);
}

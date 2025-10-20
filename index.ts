import { Result } from "@praha/byethrow";

const success = Result.succeed("Hello, world!");

const failure = Result.fail(new Error("Something went wrong"));

if (Result.isSuccess(success)) {
	console.log(success.value);
}

if (Result.isFailure(failure)) {
	console.error(failure.error.message);
}

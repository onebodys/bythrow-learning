import { Result } from "@praha/byethrow";

const double = (x: number) => x * 2;

const result = Result.pipe(Result.succeed(21), Result.map(double));

if (Result.isSuccess(result)) {
	console.log(result.value);
}

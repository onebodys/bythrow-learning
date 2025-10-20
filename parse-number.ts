import { Result } from "@praha/byethrow";

const parseNumber = Result.try({
	try: (input: string) => {
		const num = Number(input);
		if (Number.isNaN(num)) {
			throw new Error("Invalid number");
		}
		return num;
	},
	catch: (error) => new Error("Fauled to parse number", { cause: error }),
});

const result = parseNumber("あああああー");
if (Result.isSuccess(result)) {
	console.log(result.value);
}

if (Result.isFailure(result)) {
	console.log(result.error);
}

import { Result } from "@praha/byethrow";

const double = (x: number) => x * 2;

// Result.mapはいわゆるArray関数におけるmapと同様
// mapにdoubleが渡る = 2倍
const result = Result.pipe(Result.succeed(21), Result.map(double));

if (Result.isSuccess(result)) {
	// 42
	console.log(result.value);
}

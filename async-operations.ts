import { Result } from "@praha/byethrow";

const validateId = (id: string) => {
	if (!id.startsWith("u")) {
		return Result.fail(new Error("Invalid ID format"));
	}
	return Result.succeed(id);
};

const findUser = Result.try({
	try: async (userId: string) => {
		const response = await fetch(`/api/users/${userId}`);
		return await response.json();
	},
	catch: (error) => new Error("Failed to find users", { cause: error }),
});

const result = await Result.pipe(
	Result.succeed("u123"),
	Result.andThen(validateId),
	Result.andThen(findUser),
);

if (Result.isSuccess(result)) {
	console.log("User Data:", result.value);
}

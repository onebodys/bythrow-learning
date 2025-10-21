import { Result } from "@praha/byethrow";

const validateId = (id: string) => {
	if (!id.startsWith("u")) {
		return Result.fail(new Error("Invalid ID format"));
	}
	return Result.succeed(id);
};

const findUser = (id: string) => {
	if (id === "u123") {
		return Result.succeed({ id, name: "John Doe" });
	}
	return Result.fail(new Error("User not found"));
};

const toWelcome = (user: Result.InferSuccess<typeof findUser>) => {
	return `Welcome, ${user.name}`;
};

// Chain multiple operations
const result = Result.pipe(
	Result.succeed("u123"),
	Result.andThen(validateId),
	Result.andThen(findUser),
	Result.map(toWelcome),
);

if (Result.isSuccess(result)) {
	console.log(result.value);
} else {
	console.log(result.error);
}

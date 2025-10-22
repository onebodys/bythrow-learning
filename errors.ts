import { ErrorFactory } from "@praha/error-factory";

export class ValidationError extends ErrorFactory({
	name: "ValidationError",
	message: "Invalid input provided",
}) {}

export class QueryError extends ErrorFactory({
	name: "QueryError",
	message: "An error occurred while executing a query",
	fields: ErrorFactory.fields<{ query: string }>(),
}) {}

export class NotFoundError extends ErrorFactory({
	name: "NotFoundError",
	message: "Resource not found",
}) {}

export class UnexpecetedError extends ErrorFactory({
	name: "UnexpecetedError",
	message: "An unexpected error occurred",
}) {}

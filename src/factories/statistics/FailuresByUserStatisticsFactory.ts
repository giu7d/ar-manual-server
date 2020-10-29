import { Analysis } from "src/entities/Analysis/Analysis";

export interface FailuresByUser {
	failures: number;
	account: {
		fullName: string;
		id: string;
	};
}

export class FailuresByUserStatisticsFactory {
	static create(analysis: Analysis[]) {
		const failureAnalysis = analysis
			.filter(({ status }) => status === "failure")
			.map(({ steps, ...rest }) => ({
				...rest,
				steps: steps.filter(({ status }) => status === "failure"),
			}));

		const failuresByUsers: FailuresByUser[] = [];

		failureAnalysis.forEach((item) => {
			const index = failuresByUsers.findIndex(
				({ account }) => account.id === item.account.id
			);

			if (index === -1) {
				failuresByUsers.push({
					failures: 1,
					account: {
						id: item.account.id,
						fullName: `${item.account.firstName} ${item.account.lastName}`,
					},
				});
			} else {
				failuresByUsers[index].failures++;
			}
		});

		return failuresByUsers;
	}
}

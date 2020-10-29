import { Analysis } from "src/entities/Analysis/Analysis";

export interface UsersByTime {
	account: {
		id: string;
		fullName: string;
	};
	timeDiferences: Date[];
}

export class UsersByTimeStatisticsFactory {
	static create(analysis: Analysis[]) {
		const analysisByUser: UsersByTime[] = [];

		analysis.forEach(({ account, ...rest }) => {
			const diference = rest.finishedAt.getTime() - rest.startedAt.getTime();
			const timeDiference = new Date(diference);

			const index = analysisByUser.findIndex(
				(el) => el.account.id === account.id
			);

			if (index === -1) {
				analysisByUser.push({
					account: {
						id: account.id,
						fullName: `${account.firstName} ${account.lastName}`,
					},
					timeDiferences: [timeDiference],
				});
			} else {
				analysisByUser[index].timeDiferences.push(timeDiference);
			}
		});

		const usersByTime = analysisByUser.map(({ account, timeDiferences }) => {
			let timeAverage = 0;
			let timeVariance = 0;

			timeDiferences.forEach((time, index) => {
				const x = time.getTime();
				const t = index + 1;
				const previousAverage = timeAverage;
				const previousVariance = timeVariance;

				timeAverage = ((t - 1) / t) * previousAverage + x / t;

				if (t !== 1) {
					timeVariance =
						((t - 1) / t) * previousVariance +
						(1 / (t - 1)) * Math.pow(x - timeAverage, 2);
				}
			});

			const averageAsDate = new Date(Math.floor(timeAverage));

			return {
				account,
				timeVariance,
				timeAverage: averageAsDate,
			};
		});

		return usersByTime;
	}
}

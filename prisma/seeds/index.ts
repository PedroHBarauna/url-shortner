import { seedUser } from './scripts/user.seed';

async function main() {
	console.log('Strating seeds...');

	await seedUser();

	console.log('Seeds successfully executed');
}

main().catch((error) => {
	console.error('Error to execute seed:', error);
	process.exit(1);
});

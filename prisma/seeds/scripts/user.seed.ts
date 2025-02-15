import { PrismaClient } from '@prisma/client';
import { userData } from '../data/user.data';

const prisma = new PrismaClient();

export async function seedUser() {
	console.log('Starting User seed...');

	try {
		console.log('Inserting data...');
		await prisma.user.createMany({
			data: userData,
			skipDuplicates: true,
		});

		console.log('Finishing User seed...');
	} catch (error) {
		console.error('Error to execute User Seed: ', error);
	} finally {
		await prisma.$disconnect();
	}
}

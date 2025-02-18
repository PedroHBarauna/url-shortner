export const mockUrlResponse = {
	id: 1,
	originUrl: 'http://example.com',
	shortUrlId: 'abcdef',
	shortUrl: `${process.env.BASE_URL}/abcdef`,
	userId: null,
	clicks: 0,
	createdAt: new Date('2025-02-17'),
	updatedAt: new Date('2025-02-17'),
	deletedAt: null,
};

export const mockListUrl = {
	pagination: { itens: 1, page: 1, totalItens: 1, totalPages: 1 },
	data: [mockUrlResponse],
};

export const mockCreatedUrl = {
	id: 1,
	originUrl: 'http://example.com',
	shortUrlId: 'abcdef',
	shortUrl: `${process.env.BASE_URL}/abcdef`,
	userId: null,
	clicks: 0,
	createdAt: new Date('2025-02-17'),
	updatedAt: new Date('2025-02-17'),
	deletedAt: null,
};

export const mockUpdatedUrl = {
	id: 1,
	originUrl: 'http://newexample.com',
	shortUrlId: 'abcdef',
	shortUrl: `${process.env.BASE_URL}/abcdef`,
	userId: null,
	clicks: 0,
	createdAt: new Date('2025-02-17'),
	updatedAt: new Date('2025-02-17'),
	deletedAt: null,
};

export const mockDeletedUrl = {
	id: 1,
	originUrl: 'http://example.com',
	shortUrlId: 'abcdef',
	shortUrl: `${process.env.BASE_URL}/abcdef`,
	userId: null,
	clicks: 0,
	createdAt: new Date('2025-02-17'),
	updatedAt: new Date('2025-02-17'),
	deletedAt: new Date('2025-02-17'),
};

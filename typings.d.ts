type PostType = {
	id: string;
	title: string;
	body: string;
	wallet_address: string;
	crawl_id: string;
	subpin_id: string;
	created_at: string;
	comments: CommentType[];
	subpin: SubpinType;
	votes: VoteType[];
	crawl: CrawlType;
};

/**
 * Model Comment
 *
 */
type CommentType = {
	id: string;
	wallet_address: string;
	text: string;
	post_id: string;
	created_at: string;
};

/**
 * Model Crawl
 *
 */
type CrawlType = {
	id: string;
	url: string;
	title: string;
	description: string;
	thumbnail: string;
	created_at: string;
};

/**
 * Model Subpin
 *
 */
export type SubpinType = {
	id: string;
	topic: string;
	count: number;
	created_at: string;
};

/**
 * Model Vote
 *
 */
export type VoteType = {
	id: string;
	post_id: string;
	wallet_address: string;
	created_at: string;
	upvote: boolean | null;
};

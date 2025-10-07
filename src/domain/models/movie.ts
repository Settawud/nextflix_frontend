export interface MovieSummary {
    id: number;
    title: string;
    posterPath: string | null;
    backdropPath: string | null;
    voteAverage: number;
}

export interface FeaturedRails {
    trending: MovieSummary[];
    top: MovieSummary[];
    now: MovieSummary[];
}

export interface MovieDetail extends MovieSummary {
    overview: string;
    releaseDate: string | null;
    genres: string[];
}
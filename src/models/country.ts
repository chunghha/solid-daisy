export interface Country {
  name: {
    common?: string
    official: string
  }
  capital?: string[]
  population: number
  area?: number
  continents: string[]
  region?: string
  subregion?: string
  cca3?: string
  languages?: Record<string, string>
  flags: {
    svg: string
    alt?: string
  }
}

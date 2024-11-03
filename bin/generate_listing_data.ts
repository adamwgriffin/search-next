import type { IBoundary } from '../models/BoundaryModel'
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import generateListingData from '../lib/random_data'
import { sleep } from '../lib'

const DefaultOutputPath = path.join(
  __dirname,
  '..',
  'data',
  'seed_data',
  'development',
  'dev_listings.json'
)

const DefaultFilePath = path.join(
  __dirname,
  '..',
  'data',
  'seed_data',
  'development',
  'dev_boundaries.json'
)

const processArgv = async () => {
  const argv = await yargs(process.argv.slice(2))
    .option('file', {
      alias: 'f',
      type: 'string',
      default: DefaultFilePath,
      describe:
        'Path to the file to use to load boundary data from, e.g., /app/data/my_file.json'
    })
    .option('sleep', {
      alias: 's',
      type: 'number',
      default: 0,
      describe:
        'Amount of time to sleep in milliseconds between creating listings for each boundary'
    })
    .option('number', {
      alias: 'n',
      type: 'number',
      default: 100,
      describe: 'Number of listings to create for each polygon'
    })
    .option('output-path', {
      alias: 'o',
      type: 'string',
      default: DefaultOutputPath,
      describe: 'Path to save the file to'
    })
    .alias('h', 'help')
    .help('help')
    .usage(`Usage: $0 [options]`)
    .epilogue(
      'Generate random Listing data within the bounds of an array of Boundaries'
    ).argv

  if (argv.help) {
    yargs.showHelp()
    process.exit(0)
  }

  return argv
}

const main = async () => {
  const argv = await processArgv()

  const boundaries = JSON.parse(
    fs.readFileSync(argv.file, 'utf-8')
  ) as IBoundary[]
  const listings = await Promise.all(
    boundaries.map(async (boundary: IBoundary) => {
      const listings = await generateListingData(boundary.geometry, argv.number)
      await sleep(argv.sleep)
      return listings
    })
  )
  fs.writeFileSync(argv.outputPath, JSON.stringify(listings.flat(), null, 2))
}

main()

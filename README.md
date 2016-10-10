Inuitcss Generator
===

Simple CLI Tool for creating inuitcss files.

## Installation

  `npm install inuitcss-generator`

## Usage

    inuitcss-generator v0.0.3
    
      Add a new line to main.scss and crete the related file at right place with
      template.
    
    Types
    
      -s, --settings string[]     Add new settings file(s).
      -t, --tools string[]        Add new tools file(s).
      -g, --generic string[]      Add new generic file(s).
      -e, --elements string[]     Add new elements file(s).
      -o, --objects string[]      Add new objects file(s).
      -c, --components string[]   Add new components file(s).
      -u, --utilities string[]    Add new utilities file.
    
    Settings
    
      -b, --base string   Change base directory.
      -m, --main string   Change default main file name.
      -d, --desc string   Change default description message.
    
    Utils
    
      -i, --init    Create a fresh example main.scss file. Be careful when using it.
      -h, --help    Print this usage guide.

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
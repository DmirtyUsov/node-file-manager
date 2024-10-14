# File Manager using Node.js APIs.
![Screenshot from 2024-10-13 18-06-43](https://github.com/user-attachments/assets/e89aa354-71c3-4f8f-8e46-ceffe70c0052)
## How to run  
`git clone git@github.com:DmirtyUsov/nodejs-file-manager.git`  
`git switch dev`  
`npm run start -- --username=Nemo`

## Commands  
`.exit`, `up`, `ls`  
`os` --EOL, --cpus, --homedir, --username, --architecture  
`cd` `cat`, `add`, `rm`, `hash` path  
`rn`, `cp`, `mv`, `compress`, `decompress`  path_to_source path_to_destination 

## Implementation Notes
You can use double quotes `cd "dirname with spaces"`  
The `add` command does NOT overwrite existing files. If a file with the specified name already exists, the operation will fail.
The `cp` and `mv` commands will NOT create a target directory if it does not exist. The second argument of these commands is a directory, not a filename.  
For the `compress` and `decompress` commands, the second argument `path_to_destination` should be a path with a filename.
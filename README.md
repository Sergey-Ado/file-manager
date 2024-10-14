## Rules for specifying paths to files and folders
- Paths can be absolute or relative
- If the path contains spaces, the entire path must be enclosed in single or double quotes. Same thing when entering a file name with spaces
- When using the compress and decompress commands, the path_to_destination must be set to the path to the final file along with the file name
- Most of the application's functions cannot work with system files and folders (for example, for windows this is c:/, c:/windows, *.sys, etc.), so the message "Operation failed" will be displayed. To be able to work with these files and folders, you must run the application as an administrator

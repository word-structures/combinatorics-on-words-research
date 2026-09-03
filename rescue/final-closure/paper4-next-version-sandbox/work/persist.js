'use strict';
/* Fail-closed persistence: append-only + fsync on every record, atomic manifest. */
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
class Appender{
  constructor(file){this.file=file;fs.mkdirSync(path.dirname(file),{recursive:true});
    this.fd=fs.openSync(file,'a');this.seen=new Set();
    if(fs.existsSync(file)){ // resume-safe: reload existing IDs
      const txt=fs.readFileSync(file,'utf8');
      for(const line of txt.split(/\r?\n/)) if(line.trim()){try{const o=JSON.parse(line);if(o.id)this.seen.add(o.id);}catch(e){}}
    }}
  has(id){return this.seen.has(id);}
  write(rec){                       // returns false if duplicate
    if(rec.id&&this.seen.has(rec.id))return false;
    fs.writeSync(this.fd,JSON.stringify(rec)+"\n");
    fs.fsyncSync(this.fd);          // durable BEFORE we continue searching
    if(rec.id)this.seen.add(rec.id);
    return true;}
  close(){try{fs.fsyncSync(this.fd);fs.closeSync(this.fd);}catch(e){}}
}
function writeAtomic(file,obj){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const tmp=file+".tmp-"+process.pid;
  const fd=fs.openSync(tmp,'w');fs.writeSync(fd,JSON.stringify(obj,null,1));fs.fsyncSync(fd);fs.closeSync(fd);
  fs.renameSync(tmp,file);
}
const fileSha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
module.exports={Appender,writeAtomic,fileSha,host:os.hostname()};

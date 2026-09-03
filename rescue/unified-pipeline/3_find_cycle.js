const fs = require('fs');

function findCycle() {
    const data = JSON.parse(fs.readFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/dag.json", 'utf8'));
    const L = data.L;
    const statesData = JSON.parse(fs.readFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/states.json", 'utf8')).states;
    const transitions = data.transitions;
    const numNodes = data.nodes;
    
    let visited = new Array(numNodes).fill(0); // 0 = unvisited, 1 = visiting, 2 = visited
    let parent = new Array(numNodes).fill(-1);
    let cycle = [];
    
    function dfs(u) {
        visited[u] = 1;
        for (let v of transitions[u]) {
            if (visited[v] === 0) {
                parent[v] = u;
                if (dfs(v)) return true;
            } else if (visited[v] === 1) {
                // Found a cycle!
                cycle.push(v);
                let curr = u;
                while (curr !== v) {
                    cycle.push(curr);
                    curr = parent[curr];
                }
                cycle.reverse();
                return true;
            }
        }
        visited[u] = 2;
        return false;
    }
    
    let found = false;
    for (let i = 0; i < numNodes; i++) {
        if (visited[i] === 0) {
            if (dfs(i)) {
                found = true;
                break;
            }
        }
    }
    
    if (found) {
        console.log(`Found a cycle of length ${cycle.length}!`);
        
        // Construct the base word of the cycle
        let generatorBlocks = [];
        let generatorWord = "";
        
        for (let idx of cycle) {
            let stateStr = statesData[idx];
            let block = stateStr.substring(2 * L); // The new block B added in this state
            generatorBlocks.push(block);
            generatorWord += block;
        }
        
        console.log(`Cycle generator blocks:`, generatorBlocks);
        
        let profiles = generatorBlocks.map(b => {
            let p = {a:0, b:0, c:0};
            for(let ch of b) p[ch]++;
            return p;
        });
        
        fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/cycle.json", JSON.stringify({
            L: L,
            cycleLength: cycle.length,
            generatorWord: generatorWord,
            generatorBlocks: generatorBlocks,
            profiles: profiles
        }, null, 2));
        
        console.log("Saved cycle to cycle.json");
    } else {
        console.log("No cycles found in the DAG.");
    }
}

findCycle();

// let data = [];
// let selectedCommits = [];

// async function loadData() {
//     data = await d3.csv('./loc.csv', (row) => ({
//         ...row,
//         line: Number(row.line), // or just +row.line
//         depth: Number(row.depth),
//         length: Number(row.length),
//         date: new Date(row.date + 'T00:00' + row.timezone),
//         datetime: new Date(row.datetime),
//       }));
  
//     // processCommits();
//     displayStats()
//     console.log(commits);
//     // createScatterplot(); 
// }

// document.addEventListener('DOMContentLoaded', async () => {
//   await loadData();
//   createScatterplot(); 
// });

// let commits = d3.groups(data, (d) => d.commit);

// function processCommits() {
//     commits = d3
//       .groups(data, (d) => d.commit)
//       .map(([commit, lines]) => {
//         let first = lines[0];
//         let { author, date, time, timezone, datetime } = first;
//         let ret = {
//           id: commit,
//           url: 'https://github.com/vis-society/lab-7/commit/' + commit,
//           author,
//           date,
//           time,
//           timezone,
//           datetime,
//           hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
//           totalLines: lines.length,
//         };
  
//         Object.defineProperty(ret, 'lines', {
//           value: lines,
//           value: lines,
//             enumerable: false,  // Hide from console logging
//             configurable: true,
//             writable: false
//           // What other options do we need to set?
//           // Hint: look up configurable, writable, and enumerable
//         });
  
//         return ret;
//       });
//   }

// function displayStats() {
//   const numFiles = d3.groups(data, d => d.file).length;
//   const maxDepth = d3.max(data, d => d.depth);
//   const avgDepth = d3.mean(data, d => d.depth);
//   const longestLine = d3.max(data, d => d.length);
//   const avgLineLength = d3.mean(data, d => d.length);
//   const numAuthors = d3.groups(data, d => d.author).length;
//   const numDaysWorked = d3.groups(data, d => d.date).length;

//   // Compute Work Period (Morning, Afternoon, Evening, Night)
//   const workByPeriod = d3.rollups(
//     data,
//     v => v.length,
//     d => new Date(d.datetime).toLocaleString("en", { dayPeriod: "short" })
//   );
//   const mostActiveTime = d3.greatest(workByPeriod, d => d[1])?.[0];

//   // Compute Most Active Day of the Week
//   const workByDay = d3.rollups(
//     data,
//     v => v.length,
//     d => new Date(d.datetime).toLocaleString("en", { weekday: "long" })
//   );
//   const mostActiveDay = d3.greatest(workByDay, d => d[1])?.[0];

//   // Process commits first
//   processCommits();

//   // Create the dl element
//   const dl = d3.select('#stats').append('dl').attr('class', 'stats');

//   // Add total LOC
//   dl.append('dt').html('Total <abbr title="Lines of code">LOC</abbr>');
//   dl.append('dd').text(data.length);

//   // Add total commits
//   dl.append('dt').text('Total commits');
//   dl.append('dd').text(commits.length);

//   // Add more stats as needed...
//   const maxFileLength = d3.max(d3.rollups(data, v => v.length, d => d.file), d => d[1]);
//   dl.append("dt").text("Max file length");
//   dl.append("dd").text(maxFileLength);

//   dl.append("dt").text("Number of authors");
//   dl.append("dd").text(numAuthors);
  
//   dl.append("dt").text("Number of days worked");
//   dl.append("dd").text(numDaysWorked);
  
//   dl.append("dt").text("Max Depth of Code");
//   dl.append("dd").text(maxDepth);
  
//   dl.append("dt").text("Average Depth");
//   dl.append("dd").text(avgDepth.toFixed(2));
  
//   dl.append("dt").text("Longest Line (chars)");
//   dl.append("dd").text(longestLine);
  
//   dl.append("dt").text("Average Line Length");
//   dl.append("dd").text(avgLineLength.toFixed(2));
  
//   dl.append("dt").text("Most Active Time of Day");
//   dl.append("dd").text(mostActiveTime.charAt(0).toUpperCase() + mostActiveTime.slice(1));
  
//   dl.append("dt").text("Most Active Day");
//   dl.append("dd").text(mostActiveDay);
// }

// let xScale, yScale;  // ✅ Global variables
// let brushSelection = null;


// async function createScatterplot() {
//     if (!commits || commits.length === 0) {
//         console.warn("No commit data available for scatterplot.");
//         return;
//     }

//     // ✅ Define Dimensions & Margins
//     const width = 1000;
//     const height = 600;
//     const margin = { top: 20, right: 30, bottom: 40, left: 50 };

//     // ✅ Compute Usable Area
//     const usableArea = {
//         top: margin.top,
//         right: width - margin.right,
//         bottom: height - margin.bottom,
//         left: margin.left,
//         width: width - margin.left - margin.right,
//         height: height - margin.top - margin.bottom,
//     };

//     // ✅ Append SVG Element
//     const svg = d3
//         .select('#chart')
//         .append('svg')
//         .attr('viewBox', `0 0 ${width} ${height}`)
//         .style('overflow', 'visible');

//     // ✅ Define Scales
//     xScale = d3
//         .scaleTime()
//         .domain(d3.extent(commits, (d) => d.datetime))
//         .range([usableArea.left, usableArea.right])
//         .nice();

//     yScale = d3
//     // yScale = d3.scaleLinear() 
//         .scaleLinear()
//         .domain([24, 0]) // Hours of the day
//         .range([usableArea.bottom, usableArea.top]);

//     // ✅ Format Y-axis as `HH:00`
//     const yAxis = d3
//         .axisLeft(yScale)
//         .tickFormat((d) => `${String(d).padStart(2, '0')}:00`);

//     const xAxis = d3.axisBottom(xScale);

//     // ✅ Append Axes
//     svg.append("g")
//         .attr("transform", `translate(0, ${usableArea.bottom})`)
//         .call(xAxis);

//     svg.append("g")
//         .attr("transform", `translate(${usableArea.left}, 0)`)
//         .call(yAxis);

//     // ✅ Append Scatterplot Dots
//     const dots = svg.append('g').attr('class', 'dots');
//     const [minLines, maxLines] = d3.extent(commits, (d) => d.totalLines);
//     const rScale = d3
//         .scaleSqrt() // Change only this line
//         .domain([minLines, maxLines])
//         .range([4, 30]);

//     dots
//         .selectAll('circle')
//         .data(commits)
//         .join('circle')
//         .attr('cx', (d) => xScale(d.datetime))
//         .attr('cy', (d) => yScale(d.hourFrac))
//         .attr('r', (d) => rScale(d.totalLines))
//         .style('fill-opacity', 0.7)
//         .attr('fill', 'steelblue')
//         .on('mouseenter', function (event, d) {
//             // d3.select(event.currentTarget).style('fill-opacity', 1);
//             d3.select(this).style("fill-opacity", 1);
//             updateTooltipContent(d);
//             updateTooltipVisibility(true);
//             updateTooltipPosition(event);
//         })
//         .on('mouseleave', function() {
//             // d3.select(event.currentTarget).style('fill-opacity', 0.7);
//             d3.select(this).style("fill-opacity", 0.7);
//             updateTooltipContent({});
//             updateTooltipVisibility(false);
//         });

//     // Add gridlines BEFORE the axes
//     const gridlines = svg
//         .append('g')
//         .attr('class', 'gridlines')
//         .attr('transform', `translate(${usableArea.left}, 0)`);

//     // Create gridlines as an axis with no labels and full-width ticks
//     gridlines.call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width));

//     brushSelector()
// }


// function updateTooltipContent(commit) {
//     const link = document.getElementById('commit-link');
//     const date = document.getElementById('commit-date');
  
//     if (Object.keys(commit).length === 0) return;
  
//     link.href = commit.url;
//     link.textContent = commit.id;
//     date.textContent = commit.datetime?.toLocaleString('en', {
//       dateStyle: 'full',
//     });
// }

// function updateTooltipVisibility(isVisible) {
//     const tooltip = document.getElementById('commit-tooltip');
//     tooltip.hidden = !isVisible;
// }

// function updateTooltipPosition(event) {
//     const tooltip = document.getElementById('commit-tooltip');
//     const offsetX = 15;
//     const offsetY = 700;
//     tooltip.style.left = `${event.clientX + offsetX}px`;
//     tooltip.style.top = `${event.clientY + offsetY}px`;
// }

// function brushSelector() {
//     // const svg = document.querySelector('svg');
//     const svg = d3.select("svg"); 

//     // Raise dots and everything after overlay
//     // d3.select(svg).selectAll('.dots, .overlay ~ *').raise();
//     const brush = d3.brush()
//         .extent([[0, 0], [1000, 600]])  // ✅ Define brush area
//         .on("start brush end", brushed);

//     svg.append("g")
//         .attr("class", "brush")
//         .call(brush)
//         .lower();  // ✅ Keeps brush behind dots
//     // d3.select(svg).call(d3.brush().on('start brush end', brushed));
// }


// // function brushed(event) {
// //     brushSelection = event.selection;
// //     updateSelection();
// //     updateSelectionCount();  
// //     updateLanguageBreakdown();  // ✅ Ensures language breakdown updates too
// // }
// function brushed(evt) {
//     let brushSelection = evt.selection;
//     selectedCommits = brushSelection ? commits.filter(commit => {
//         let [xMin, yMin] = brushSelection[0];
//         let [xMax, yMax] = brushSelection[1];
//         let x = xScale(commit.datetime);
//         let y = yScale(commit.hourFrac);
//         return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
//     }) : [];

//     updateSelection();
//     updateSelectionCount();
//     updateLanguageBreakdown();
// }



// // function isCommitSelected(commit) {
// //     if (!brushSelection) {
// //         return false;
// //     }
// //     const min = { x: brushSelection[0][0], y: brushSelection[0][1] };
// //     const max = { x: brushSelection[1][0], y: brushSelection[1][1] };

// //     // ✅ Convert commit data to pixel positions
// //     const x = xScale(commit.datetime);
// //     const y = yScale(commit.hourFrac);

// //     return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
// // }
// function isCommitSelected(commit) {
//     return selectedCommits.includes(commit);
//   }


// function updateSelection() {
//     d3.selectAll("circle")
//         .classed("selected", false)  // ✅ Clears previous selection
//         .classed("selected", (d) => isCommitSelected(d));  // ✅ Applies new selection
// }


// function updateSelectionCount() {
//     const selectedCommits = brushSelection
//         ? commits.filter(isCommitSelected)
//         : [];

//     const countElement = document.getElementById("selection-count");
//     countElement.textContent = `${selectedCommits.length || "No"} commits selected`;
// }


// function updateLanguageBreakdown() {
//     const selectedCommits = brushSelection
//         ? commits.filter(isCommitSelected)
//         : [];
//     const container = document.getElementById('language-breakdown');

//     if (selectedCommits.length === 0) {
//         container.innerHTML = '';
//         return;
//     }
//     const requiredCommits = selectedCommits.length ? selectedCommits : commits;
//     const lines = requiredCommits.flatMap((d) => d.lines);

//     // Use d3.rollup to count lines per language
//     const breakdown = d3.rollup(
//         lines,
//         (v) => v.length,
//         (d) => d.type
//     );

//     // Update DOM with breakdown
//     container.innerHTML = '';

//     for (const [language, count] of breakdown) {
//         const proportion = count / lines.length;
//         const formatted = d3.format('.1~%')(proportion);

//         container.innerHTML += `
//                 <dt>${language}</dt>
//                 <dd>${count} lines (${formatted})</dd>
//             `;
//     }

//     return breakdown;
// }










let data = [];
let selectedCommits = [];
let commits = [];
let xScale, yScale;

async function loadData() {
    data = await d3.csv('./loc.csv', (row) => ({
        ...row,
        line: Number(row.line),
        depth: Number(row.depth),
        length: Number(row.length),
        date: new Date(row.date + 'T00:00' + row.timezone),
        datetime: new Date(row.datetime),
    }));

    processCommits();
    displayStats();  // ✅ Ensure statistics are displayed
    createScatterplot();
}

document.addEventListener('DOMContentLoaded', loadData);

// ✅ Process Commits
function processCommits() {
    commits = d3.groups(data, (d) => d.commit).map(([commit, lines]) => {
        let first = lines[0];
        let { author, date, time, timezone, datetime } = first;
        return {
            id: commit,
            url: `https://github.com/vis-society/lab-7/commit/${commit}`,
            author, date, time, timezone, datetime,
            hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
            totalLines: lines.length,
            lines
        };
    });
}

// ✅ Display Statistics
function displayStats() {
    const numFiles = d3.groups(data, d => d.file).length;
    const numAuthors = d3.groups(data, d => d.author).length;
    const numDaysWorked = d3.groups(data, d => d.date).length;
    const maxDepth = d3.max(data, d => d.depth);
    const avgDepth = d3.mean(data, d => d.depth).toFixed(2);
    const longestLine = d3.max(data, d => d.length);
    const avgLineLength = d3.mean(data, d => d.length).toFixed(2);

    const workByPeriod = d3.rollups(data, v => v.length, d => 
        new Date(d.datetime).toLocaleString("en", { dayPeriod: "short" })
    );
    const mostActiveTime = d3.greatest(workByPeriod, d => d[1])?.[0];

    const workByDay = d3.rollups(data, v => v.length, d => 
        new Date(d.datetime).toLocaleString("en", { weekday: "long" })
    );
    const mostActiveDay = d3.greatest(workByDay, d => d[1])?.[0];

    const dl = d3.select('#stats').append('dl').attr('class', 'stats');

    dl.append('dt').html('Total <abbr title="Lines of code">LOC</abbr>');
    dl.append('dd').text(data.length);

    dl.append('dt').text('Total commits');
    dl.append('dd').text(commits.length);

    dl.append("dt").text("Number of authors");
    dl.append("dd").text(numAuthors);
    
    dl.append("dt").text("Number of days worked");
    dl.append("dd").text(numDaysWorked);
    
    dl.append("dt").text("Max Depth of Code");
    dl.append("dd").text(maxDepth);
    
    dl.append("dt").text("Average Depth");
    dl.append("dd").text(avgDepth);
    
    dl.append("dt").text("Longest Line (chars)");
    dl.append("dd").text(longestLine);
    
    dl.append("dt").text("Average Line Length");
    dl.append("dd").text(avgLineLength);
    
    dl.append("dt").text("Most Active Time of Day");
    dl.append("dd").text(mostActiveTime.charAt(0).toUpperCase() + mostActiveTime.slice(1));
    
    dl.append("dt").text("Most Active Day");
    dl.append("dd").text(mostActiveDay);
}

// ✅ Create Scatterplot
async function createScatterplot() {
    if (!commits.length) return;

    const width = 1000, height = 600, margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const usableArea = {
        top: margin.top, right: width - margin.right,
        bottom: height - margin.bottom, left: margin.left,
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
    };

    const svg = d3.select('#chart').append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible');

    xScale = d3.scaleTime().domain(d3.extent(commits, d => d.datetime)).range([usableArea.left, usableArea.right]).nice();
    yScale = d3.scaleLinear().domain([24, 0]).range([usableArea.bottom, usableArea.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => `${String(d).padStart(2, '0')}:00`);

    svg.append("g").attr("transform", `translate(0, ${usableArea.bottom})`).call(xAxis);
    svg.append("g").attr("transform", `translate(${usableArea.left}, 0)`).call(yAxis);

    const dots = svg.append('g').attr('class', 'dots');
    const rScale = d3.scaleSqrt().domain(d3.extent(commits, d => d.totalLines)).range([4, 30]);

    dots.selectAll('circle')
    .data(commits)
    .join('circle')
    .attr('cx', d => xScale(d.datetime))
    .attr('cy', d => yScale(d.hourFrac))
    .attr('r', d => rScale(d.totalLines))
    .attr('fill', 'steelblue')
    .style('fill-opacity', 0.7)
    .on('mouseenter', function (event, d) {
        d3.select(this)
            .classed("selected", isCommitSelected(d))  // ✅ Apply brush selection color
            .style("fill-opacity", 1);
        
        updateTooltipContent(d);
        updateTooltipVisibility(true);
        updateTooltipPosition(event);
    })
    .on('mouseleave', function (event, d) {
        d3.select(this)
            .classed("selected", isCommitSelected(d))  // ✅ Ensure selection consistency
            .style("fill-opacity", isCommitSelected(d) ? 1 : 0.7);
        
        updateTooltipContent({});
        updateTooltipVisibility(false);
    });


    brushSelector(svg);
}

function updateTooltipContent(commit) {
    const link = document.getElementById('commit-link');
    const date = document.getElementById('commit-date');
  
    if (Object.keys(commit).length === 0) return;
  
    link.href = commit.url;
    link.textContent = commit.id;
    date.textContent = commit.datetime?.toLocaleString('en', {
      dateStyle: 'full',
    });
}

function updateTooltipVisibility(isVisible) {
    const tooltip = document.getElementById('commit-tooltip');
    tooltip.hidden = !isVisible;
}

function updateTooltipPosition(event) {
    const tooltip = document.getElementById('commit-tooltip');
    const offsetX = 15;
    const offsetY = 700;
    tooltip.style.left = `${event.clientX + offsetX}px`;
    tooltip.style.top = `${event.clientY + offsetY}px`;
}

// ✅ Brush Selector
function brushSelector(svg) {
    const brush = d3.brush().extent([[0, 0], [1000, 600]]).on("start brush end", brushed);
    svg.append("g").attr("class", "brush").call(brush).lower();
}

// ✅ Brushed Selection
function brushed(evt) {
    let brushSelection = evt.selection;
    selectedCommits = brushSelection ? commits.filter(commit => {
        let [xMin, yMin] = brushSelection[0];
        let [xMax, yMax] = brushSelection[1];
        let x = xScale(commit.datetime);
        let y = yScale(commit.hourFrac);
        return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
    }) : [];

    updateSelection();
    updateSelectionCount();
    updateLanguageBreakdown();
}

// ✅ Update Selections
function updateSelection() {
    d3.selectAll("circle").classed("selected", d => isCommitSelected(d));
}

function updateSelectionCount() {
    document.getElementById("selection-count").textContent = `${selectedCommits.length || "No"} commits selected`;
}

// ✅ Language Breakdown
function updateLanguageBreakdown() {
    const container = document.getElementById('language-breakdown');
    container.innerHTML = '';

    if (!selectedCommits.length) return;

    const lines = selectedCommits.flatMap(d => d.lines);
    const breakdown = d3.rollup(lines, v => v.length, d => d.type);

    for (const [language, count] of breakdown) {
        const proportion = count / lines.length;
        const formatted = d3.format('.1~%')(proportion);
        container.innerHTML += `<dt>${language}</dt><dd>${count} lines (${formatted})</dd>`;
    }
}

// ✅ Commit Selection Check
function isCommitSelected(commit) {
    return selectedCommits.includes(commit);
}




// let commitProgress = 100;
// let timeScale; // Define timeScale globally

// // ✅ Initialize filtering UI
// function initCommitFilter() {
//     const commitSlider = d3.select("#commit-slider");
//     const selectedTime = d3.select("#commit-time");

//     // ✅ Ensure commits are loaded before initializing timeScale
//     if (!commits || commits.length === 0) {
//         console.error("❌ No commits data available for slider.");
//         selectedTime.text("No commits available");
//         return;
//     }

//     // ✅ Create time scale after commits are loaded
//     timeScale = d3.scaleTime()
//         .domain(d3.extent(commits, d => d.datetime)) // Min & Max commit time
//         .range([0, 100]);

//     // ✅ Ensure commitProgress is within range
//     commitProgress = Math.min(commitProgress, 100);
//     selectedTime.text(timeScale.invert(commitProgress).toLocaleString());

//     // ✅ Add event listener for slider interaction
//     commitSlider.on("input", function () {
//         commitProgress = +this.value;
//         selectedTime.text(timeScale.invert(commitProgress).toLocaleString());
//         updateFilteredCommits();
//     });
// }

// // ✅ Function to filter commits based on slider value
// function updateFilteredCommits() {
//     if (!timeScale) return; // Ensure timeScale is initialized
//     let commitMaxTime = timeScale.invert(commitProgress);

//     // ✅ Filter commits based on commitMaxTime
//     let filteredCommits = commits.filter(d => d.datetime <= commitMaxTime);

//     // ✅ Update scatterplot with filtered commits
//     updateScatterplot(filteredCommits);
// }

// // ✅ Load data before initializing UI
// document.addEventListener('DOMContentLoaded', async () => {
//     await loadData(); // Ensure commits are loaded
//     processCommits(); // Process commits
//     createScatterplot(); // Initialize scatterplot
//     initCommitFilter(); // ✅ Only initialize filter after commits exist
// });
let commitProgress = 100;  // Global variable representing the slider's value (as a percentage)
let timeScale;

// This function initializes the commit filter UI.
function initCommitFilter() {
    // Select the slider and time elements from the DOM
    const commitSlider = d3.select("#commit-slider");
    const commitTimeElement = d3.select("#commit-time");

    // Ensure commits data is available before creating the time scale.
    if (!commits || !commits.length) {
        console.error("No commits available for filtering.");
        commitTimeElement.text("No commits available");
        return;
    }

    // Create the time scale mapping commit datetimes to a 0–100 range.
    timeScale = d3.scaleTime()
        .domain([d3.min(commits, d => d.datetime), d3.max(commits, d => d.datetime)])
        .range([0, 100]);

    // Update the time element on page load.
    commitTimeElement.text(timeScale.invert(commitProgress).toLocaleString({
        dateStyle: "long",
        timeStyle: "short"
    }));

    // Bind the slider's input event to update commitProgress and the displayed time.
    commitSlider.on("input", function() {
        commitProgress = +this.value;
        commitTimeElement.text(timeScale.invert(commitProgress).toLocaleString({
            dateStyle: "long",
            timeStyle: "short"
        }));
        updateFilteredCommits(); // Update your visualization based on the new slider value.
    });
}

// Call the init function when the document is ready.
document.addEventListener('DOMContentLoaded', initCommitFilter);


#pragma strict

class maze_cell {
	var type;
	var rotation;
	var wall;
}

function maze_cell (type, rotation, wall) {
    this.type = type;
    this.rotation = rotation;
    this.wall = wall;
    
//type options:
//	0 empty
//	1 straight
//	2 corner
//	3 T-intersection
//	4 4-way
//	5 gap

//rotation options:
//	Rotate 0 (+X)	Rotate 1(-Z)	Rotate 2(-X)	Rotate 3(+Z)
//	7	8	9		1	4	7		3	2	1		9	6	3
//	4	5	6		2	5	8		6	5	4		8	5	2
//	1	2	3		3	6	9		9	8	7		7	4	1

//wall indicates wall in cell 6 (1/0)

}

semanticss
==========

A tool that keeps your CSS properties in an order you define.

This script is intended as a proof of concept as it stands now.

**Example Input**

```
.a {
  background-size: 11px 20px;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 30px;
  bottom: 30px;
  width: 40px;
  text-indent: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.b {
  position:fixed;
  right: 30px;
  top:10px;
  background: black;
  opacity: .8;
  border-radius: 10px;
  color:#eee;
  padding:20px;
  min-width: 200px;
  max-width: 400px;
  text-align: center;
  z-index: 99999;
  box-shadow: 1px 1px 5px #000;
  display:none; 
}
```

**Example Output**
```
.a {
  /* positioning */
  position: absolute;
  top: 30px;
  bottom: 30px;
  overflow: hidden; 

  /* sizing */
  width: 40px; 

  /* background */
  background-size: 11px 20px;
  background-repeat: no-repeat;
  background-position: center center; 

  /* text */
  text-indent: 100%;
  white-space: nowrap;
}

.b {
  /* positioning */
  position: fixed;
  right: 30px;
  top: 10px;
  z-index: 99999; 

  /* sizing */
  padding: 20px;
  min-width: 200px;
  max-width: 400px;
  display: none; 

  /* border */
  border-radius: 10px; 

  /* background */
  background: black; 

  /* text */
  color: #eee;
  text-align: center;
}
```

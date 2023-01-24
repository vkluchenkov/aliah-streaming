#!/bin/bash
echo "Sleep 10s"
sleep 10s
curl -X POST http://localhost:3000/api/start_schedule -H "Accept: */*" 
echo "Request finished"